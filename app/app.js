
angular.module('app', ['ui.bootstrap','ui.router','ngAnimate', 'angularify.semantic.sidebar', 'angular-loading-bar', 'ngTagsInput', 'LocalForageModule']);
angular.module('app').config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
angular.module('app').config(function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});
angular.module('app').constant('IP', 'http://192.168.1.27:3010');
angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        views: {
            cover: {
                templateUrl: 'partial/authentication/login/login.html',
                controller: 'LoginCtrl'
            }
        }
    });
    $stateProvider.state('logout', {
        url: '/logout',
        templateUrl: 'partial/authentication/logout/logout.html',
        controller: 'LogoutCtrl'
    });
    $stateProvider.state('root', {
        abstract: true,
        views: {
            sidebar: {
                templateUrl:'partial/common/sidebar/sidebar.html',
                controller:'SidebarCtrl'
            }
        },
        resolve:{
           checkLogin: function(authService) {
               return authService.isLoggedIn();
           }
        }
    });
    $stateProvider.state('root.projects', {
        url: '/projects',
        views: {
            'main@' : {
                templateUrl: 'partial/projects/projects.html',
                controller: 'ProjectsCtrl',
                resolve: {
                    projects: function (projectsService) {
                        return projectsService.getProjects();
                    }
                }
            }
        }
    });
    $stateProvider.state('root.projects.add-project', {
        url: '/add',
        views: {
            "main@": {
                controller: 'AddProjectCtrl',
                templateUrl: 'partial/projects/add-project/add-project.html'
            }
        }
    });
    $stateProvider.state('root.projects.edit-project', {
        url: '/edit/:id/:slug',
        views: {
            "main@" : {
                controller: 'EditProjectCtrl',
                templateUrl: 'partial/projects/edit-project/edit-project.html',
                resolve: {
                    project: function (projectsService, $stateParams) {
                        return projectsService.getProject($stateParams.id);
                    }
                }
            }
        }
    });
    $stateProvider.state('root.projects.single-project', {
        url: '/project/:id/:slug',
        views: {
            "main@" : {
                controller: 'SingleProjectCtrl',
                templateUrl: 'partial/projects/single-project/single-project.html',
                resolve: {
                    project: function (projectsService, $stateParams) {
                        return projectsService.getProject($stateParams.id);
                    }
                }
            }
        }
    });
    $stateProvider.state('root.articles', {
        url: '/articles',
        views: {
            "main@" : {
                controller: 'ArticlesCtrl',
                templateUrl: 'partial/articles/articles.html',
                resolve: {
                    articles: function(articleService) {

                    }
                }
            }
        }
    });
    $stateProvider.state('root.articles.article', {
        url: '/article',
        views: {
            "main@": {
                controller: 'ArticleCtrl',
                templateUrl: 'partial/articles/article/article.html',
                resolve: {
                    article: function (articleService) {

                    }
                }
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');
});

angular.module('app').run(function($rootScope) {

    $rootScope.$on('$stateChangeStart', function(event, toState){

        switch(toState.name){
            case 'login':
                $rootScope.isCoverView = true;
                break;
            case 'register':
                $rootScope.isCoverView = true;
                break;
            case 'logout':
                $rootScope.isCoverView = true;
                break;
            default:
                $rootScope.isCoverView = false;
                break;
        }

    });

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
