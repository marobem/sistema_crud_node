angular.module('service', [])
.factory('Cliente', ['$http', function($http){
    return {
        get : function() {
            return $http.get('/cliente');
        }
    }
}]
).factory('Pedidos', ['$http', function($http){
    return {        
        get : function() {                        
            return $http.get('/pedidos');
        },
        //matricularSe: function (turma) {
        //    return $http.post('/turmas/matricular-se', turma);  
        //},
        //cancelarMatricula: function (turma) {
        //    return $http.post('/turmas/cancelar-matricula', turma);  
        //},
        //alunosPorDisciplina: function () {
        //    return $http.get('/turmas/alunos-por-disciplina');
        //},            
        //totalVagasPorDisciplina: function () {
        //    return $http.get('/turmas/total-vagas-por-disciplina');
        //}
    }
}]
).factory('formatDateService', function () {
    return {
        formatDate : function (date) {
            var dateFormat = date.slice(0, 10).split('-');
            return dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0];
        }        
    }
})