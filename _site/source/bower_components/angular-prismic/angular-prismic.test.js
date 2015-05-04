describe('Provider: prismicProvider', function(){

    var $rootScope, prismic;

    beforeEach(function(){
        module('prismic.io', function (prismicProvider) {
        });

        inject(function(_$rootScope_, _prismic_){
            $rootScope = _$rootScope_;
            prismic = _prismic_;
        });
    });

    it('Should return something', function(){
       expect(prismic).toBeDefined();
    });

});