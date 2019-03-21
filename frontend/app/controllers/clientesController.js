'use strict';
angular.module('clientesController', [])
    .controller('clientesController',
        [
            '$scope',
            '$http',
            '$mdDialog',
            '$mdMedia',
            '$location',
            '$q',
            'formatDateService',
            'Pedidos',
            'Cliente', function ($scope, $http, $mdDialog, $mdMedia, $location, $q, formatDateService, Pedidos, Cliente) {
                $scope.titulo = 'Pedidos';

                const gerarGrade = function () {
                    const iMaxNum = 6
                    var i, j;
                    $scope.matriz = new Array(iMaxNum + 1);
                    for (i = 2; i <= iMaxNum; i++) {
                        $scope.matriz[i] = new Array(2);
                        for (j = 1; j <= 2; j++) {
                            $scope.matriz[i][j] = '---';
                        }
                    }
                }

                const preencherGrade = function (turmasMatriculadas) {
                    turmasMatriculadas.forEach(turma => {
                        if (turma.horario !== "PP" && turma.horario !== "TCCI" && turma.horario !== "TCCII") {
                            var horarios = turma.horario.split(" ");
                            horarios.forEach(horario => {
                                var dia = parseInt(horario.charAt(0));
                                var hora = horario.substring(1, horario.length);
                                if (hora == "LM") {
                                    $scope.matriz[dia][1] = turma.codCred;
                                } else {
                                    $scope.matriz[dia][2] = turma.codCred;
                                }
                            });
                        }
                    });
                }

                const inicializacao = function () {
                    $scope.turmasMatriculadas = [];
                    Aluno.get().success(function (aluno) {
                        Turmas.get().success(function (turmas) {
                            $scope.turmas = turmas.map(function (turma) {
                                if (turma.alunos.includes(aluno.alunoId)) {
                                    $scope.turmasMatriculadas.push(turma);
                                    turma.matriculado = true;
                                }
                                return turma;
                            });
                        });
                        gerarGrade();
                        if (aluno.turmasMatriculadas !== undefined) {
                            preencherGrade(aluno.turmasMatriculadas);
                        }

                    });
                }

                inicializacao();

                // =============================================================================
                // Verifica se está matriculado em horário =====================================
                // =============================================================================
                const isMatriculado = function (turma) {
                    var deferred = $q.defer();
                    if (turma.horario === "PP" || turma.horario === "TCCI" || turma.horario === "TCCII") {
                        deferred.resolve(false);
                        return deferred.promise;
                    }
                    var horarios = turma.horario.split(" ");
                    var matriculado = false;
                    horarios.forEach(horario => {
                        var dia = parseInt(horario.charAt(0));
                        var hora = horario.substring(1, horario.length);
                        if (hora == "LM") {
                            if ($scope.matriz[dia][1] !== "---") {
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Horário já matriculado.')
                                        .ok('Fechar')
                                );
                                matriculado = true;
                            }
                        } else {
                            if ($scope.matriz[dia][2] !== "---") {
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .textContent('Horário já matriculado.')
                                        .ok('Fechar')
                                );
                                matriculado = true;
                            }
                        }
                    });
                    deferred.resolve(matriculado);
                    return deferred.promise;
                }

                // =============================================================================
                // Matricular-se ===============================================================
                // =============================================================================
                $scope.matricularSe = function (index, turma) {
                    var turmaMatriculada = { codCred: turma.codCred, numeroTurma: turma.numeroTurma };

                    var promise = isMatriculado(turma);

                    promise.then(function (jaMatriculado) {

                        if (jaMatriculado) return;

                        Turmas.matricularSe(turmaMatriculada).success(function (result) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .textContent('Matrícula realizada com sucesso.')
                                    .ok('Fechar')
                            );
                            $scope.turmas[index].vagasDisponiveis = result.vagasDisponiveis - 1;
                            $scope.turmas[index].matriculado = true;

                            $scope.turmasMatriculadas.push(result);

                            if (result.horario === "PP" || result.horario === "TCCI" || result.horario === "TCCII") return;

                            var horarios = result.horario.split(" ");
                            horarios.forEach(horario => {
                                var dia = parseInt(horario.charAt(0));
                                var hora = horario.substring(1, horario.length);
                                if (hora == "LM") {
                                    $scope.matriz[dia][1] = result.codCred;
                                } else {
                                    $scope.matriz[dia][2] = result.codCred;
                                }
                            });
                        });
                    });
                }

                // =============================================================================
                // Cancelar Matrícula ==========================================================
                // =============================================================================
                $scope.cancelarMatricula = function (index, turma) {
                    var turmaCancelada = { codCred: turma.codCred, numeroTurma: turma.numeroTurma };
                    Turmas.cancelarMatricula(turmaCancelada).success(function (result) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .textContent('Matrícula cancelada com sucesso.')
                                .ok('Fechar')
                        );
                        $scope.turmas[index].vagasDisponiveis = result.vagasDisponiveis + 1;
                        $scope.turmas[index].matriculado = false;

                        for (var i = 0; i < $scope.turmasMatriculadas.length; i++) {
                            if ($scope.turmasMatriculadas[i].codCred == turma.codCred) {
                                $scope.turmasMatriculadas.splice(i, 1);
                            }
                        }

                        if (result.horario === "PP" || result.horario === "TCCI" || result.horario === "TCCII") return;

                        var horarios = result.horario.split(" ");
                        horarios.forEach(horario => {
                            var dia = parseInt(horario.charAt(0));
                            var hora = horario.substring(1, horario.length);
                            if (hora == "LM") {
                                $scope.matriz[dia][1] = "---";
                            } else {
                                $scope.matriz[dia][2] = "---";
                            }
                        });

                    })
                }
            }]);