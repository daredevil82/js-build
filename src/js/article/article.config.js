function ArticleConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.article', {
            url: 'article/:slug',
            controller: 'ArticleCtrl as $ctrl',
            templateUrl: 'js/article/article.html',
            title: 'Article'
        });
}

export default ArticleConfig;