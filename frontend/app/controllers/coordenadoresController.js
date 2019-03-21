'use strict';
angular.module('coordenadoresController', [])
    .controller('coordenadoresController',
        [
            '$scope',
            '$http',
            '$mdDialog',
            '$mdMedia',
            '$location',
            '$q',
            '$filter',
            'formatDateService',
            'Turmas',
            'Aluno', function ($scope, $http, $mdDialog, $mdMedia, $location, $q, $filter, formatDateService, Turmas, Aluno) {

                $scope.filtros = [
                    { id: 1, descricao: 'vagas disponíveis por disciplina' },
                    { id: 2, descricao: 'alunos matriculados por disciplina' },
                ];

                $scope.relatorio = [];

                const buscarAlunosPorDisciplina = function () {
                    Turmas.alunosPorDisciplina().success(function (data) {
                        $scope.alunoPorDisciplina = true;
                        $scope.vagaPorDisciplina = false;
                        $scope.relatorio = data;
                        console.log('alunos', $scope.alunos);
                    });
                }

                const buscarVagasPorDisciplina = function () {
                    Turmas.totalVagasPorDisciplina().success(function (data) {
                        $scope.vagaPorDisciplina = true;
                        $scope.alunoPorDisciplina = false;
                        $scope.relatorio = data;
                        console.log('vagas', $scope.vagas);
                    });
                }

                $scope.selecionaFiltro = function () {
                    var consulta = $filter('filter')($scope.filtros, { id: $scope.filtroSelecionadoId })[0].id;
                    switch (consulta) {
                        case 1:
                            buscarVagasPorDisciplina();
                            break;
                        case 2:
                            buscarAlunosPorDisciplina();
                            break;
                    }
                };
            }]);