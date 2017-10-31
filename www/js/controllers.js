angular.module('directory.controllers', ['ionic', 'ngOpenFB','angCamera', 'ionMdInput', 'ionic-material', 'ngCordova', 'rzModule', 'ui.bootstrap'])



.controller('syzeCtrl', function($scope, $state, $ionicSideMenuDelegate) {

  angular.element(function () {
    console.log('page loading completed');
});
      
      $ionicSideMenuDelegate.canDragContent(false);

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }
       }


  console.log('kreu mthf');
  console.log(window.localStorage.token);

  $scope.dergoInput=function (item){
    if (item=="" || item==undefined) {
          alert("Ju lutem shkruani dicka");
        }else {
    window.localStorage.setItem('searchiKerk', item);
    window.location = "#/app/search-results";
  }

  }

})




.controller('produkteSingleCtrl',function($scope, $state,$stateParams,$http, $ionicPopup, $rootScope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicModal){

    $scope.showSpinner=true;
    $scope.shfaqMonedhenTjeter=true;
    $scope.shfaqGjendjenOrange=false;
    $scope.shfaqGjendjenGreen=false;

//     angular.element(document).ready(function () {
//     console.log('page loading completed');
// });

//     $scope.$watch('$viewContentLoaded', function(){
//         //do something
//         console.log('do thirrem ne fund fare');
//         $scope.showSpinner=false;
//     });

//     $scope.$on('$viewContentLoaded', function() {
//     //call it here
//       console.log('do thirrem ne fund fare 2');
//   });

$scope.getShnamo=function(action,id){
  // var action=action;
  //console.log("u thirra kot");
    $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/shnamo',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         action : action,
         idd: id
       }
     }).success(function(response) {
      console.log(response);
      if (response.pergjigje1!='perditesim') {


            var ip = 'http://79.106.161.194:3040';
            var username = "dea";  
            var encrypted='52f47b027746c6a9d000cb866d8b92ab446a67aea3c264cc9ea02a70ce1bbd04';

            var kokaPrefiks='SHNAMO';
            var currId=response.pergjigje1.shnamo;
            var id_dok=kokaPrefiks+response.pergjigje1.shnamo;
            

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            var dataS = mm+'/'+dd+'/'+yyyy;
            //console.log(todayy);
            //var dataS='08/25/2017';
            var currCmimiTvsh=$scope.syze.cmimilek;
            var currCmimiPaTvsh=currCmimiTvsh/1.2;
            currCmimiPaTvsh=currCmimiPaTvsh.toFixed(2);
            // console.log(currCmimiTvsh);
            // console.log(currCmimiPaTvsh);




            var trupiEksport = new Array();
            var kokaEksport = new Array();

            var kokeNew = {
                    'ID_DOKIMPORT':id_dok,
                    'NENKATEGORIA':'USH',
                    'LLOJDOKUMENTI':'USHmag',
                    'NRDOK': id_dok,
                    // 'NDERMARRJEKOD': vlera,
                    'DATEDOK': dataS,
                    'KLIENTFURNITOR': 'KL83',
                    'MENYREPAGESE': 'Pagese',
                    'DTREGJISTRIMI': dataS, 
                    'EMERKLIENTI': 'Test Klienttt',
                    'KONTAKTI': '069121212',
               };

              kokaEksport.push(kokeNew);

              // Trupi eshte nje array me objetet qe do te shiten brenda
              // for (var j = 0; j < trupi.length; j++) {
              //     var trupNew = {
              //         'ID_DOKIMPORTKOKA': '99999999999999999999999999999999999999999', //Këtu duhet vendosur id e kokës së dokumentit.
              //         'LLOJVEPRIMI': 'Artikull',
              //         'KODI': 'SD13137',  //Duhet të vendoset kodi i artikullit. Fushë e detyrueshme.
              //         'NJESIA': 'cope', //Duhet të vendoset njësia matëse e artikullit. Fushë e detyrueshme.
              //         'SASIA': 1,  //Duhet të vendoset sasia e artikullit. Fushë e detyrueshme.
              //         'CMIMI': 23900,  //Nëse përdoren cmime pa TVSH për artikujt, duhet të vendoset cmimi pa tvsh. 
              //         // 'ZBRITJE': vlera,  //Nëse ka zbritje analitike duhet të vendoset përqindja e zbritjes. Fushë jo e detyrueshme.
              //         'VLEFTAPATVSH': 23900,  //Duhet të vendoset vlefta pa tvsh e artkullit. Fushë e detyrueshme.
              //         'VLEFTAMETVSH': 23900,  //Duhet të vendoset vlefta me tvsh e artkullit. Fushë e detyrueshme.
              //         'MAGAZINA ': 'qendra',  //Duhet të vendoset magazina nga po behet veprimi. Fushë e detyrueshme.
              //         'SHENIME': "test nga aplikacioni",
              //         // 'CMIMIMETVSH': vlera  //Nëse përdoren cmime me TVSH duhet të vendoset cmimi i artikullit te kjo fushë, fushë jo e detyrueshme.
            
              //                    };
              //     trupiEksport.push(trupNew);
              // }

                      var trupNew = {
                      'ID_DOKIMPORTKOKA': id_dok, //Këtu duhet vendosur id e kokës së dokumentit.
                      'LLOJVEPRIMI': 'Artikull',
                      'KODI': 'SD13137',  //Duhet të vendoset kodi i artikullit. Fushë e detyrueshme.
                      'NJESIA': 'cope', //Duhet të vendoset njësia matëse e artikullit. Fushë e detyrueshme.
                      'SASIA': 1,  //Duhet të vendoset sasia e artikullit. Fushë e detyrueshme.
                      'CMIMI': currCmimiTvsh,  //Nëse përdoren cmime pa TVSH për artikujt, duhet të vendoset cmimi pa tvsh.
                      'LLOJZBRITJE': 'Perqindje', 
                      'ZBRITJE': 0,  //Nëse ka zbritje analitike duhet të vendoset përqindja e zbritjes. Fushë jo e detyrueshme.
                      'TVSH': 20,
                      'VLEFTAPATVSH': currCmimiPaTvsh,  //Duhet të vendoset vlefta pa tvsh e artkullit. Fushë e detyrueshme.
                      'VLEFTAMETVSH': currCmimiTvsh,  //Duhet të vendoset vlefta me tvsh e artkullit. Fushë e detyrueshme.
                      'MAGAZINA': 'MX83',  //Duhet të vendoset magazina nga po behet veprimi. Fushë e detyrueshme.
                      'SHENIME': "test nga aplikacioni i sakte",
                      // 'CMIMIMETVSH': vlera  //Nëse përdoren cmime me TVSH duhet të vendoset cmimi i artikullit te kjo fushë, fushë jo e detyrueshme.
            
                                 };
                  trupiEksport.push(trupNew);


          // }

          var dokPerTeDerguar = {kokaEksport: kokaEksport, trupiEksport: trupiEksport};

          var dataToSend = JSON.stringify({
              listEksportuar: dokPerTeDerguar,
              formatPerImport: 'ImportShitjeDEA',
              formatObjekti: "Shitje"
          });
          console.log(dataToSend);




          $.ajax({
           beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username +":"+encrypted));
            },
            url: ip + "/importoEksportin",
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            dataType: 'json',
            headers: {
            'ndermarrjaserver': 'MAXOPTIKA',
            'eksportprefixid': 'Shitje'
           },
           success: function (res) {
            $scope.$apply(function () {
                console.log('rezultati erdhiii');
                console.log(res);
                $scope.getShnamo('perditeso',currId+1);
            });

            



           },
            error: function (res) {
            
            //console.log(res);
            $scope.$apply(function () {
               console.log('something went wrong');
                console.log(res);
            });
          }   
        });

         }else{
          console.log('rast perditesimi')
         } 

      });

}

$scope.testApi=function(){
  //console.log('u thirra');





  $scope.getShnamo('merr','bosh');
  // $scope.getShnamo('perditeso',0);
  




  


  // $http({
  //      method: 'GET',
  //      //url: 'https://tarzantest.herokuapp.com/login',
  //      url: 'https://max-optika-server.herokuapp.com/test',
  //      headers: {
  //        'Content-Type': 'application/x-www-form-urlencoded'
  //      },
  //      transformRequest: function(obj) {
  //        var str = [];
  //        for (var p in obj)
  //          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  //        return str.join("&");
  //      },
  //      // data: {
  //      //   productId : $stateParams.productId
  //      // }
  //    }).success(function(response) {
  //     console.log(response);

  //     });

}


$scope.shfaqNgjyrat=function(){
  $ionicModal.fromTemplateUrl('templates/ngjyrat.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
}

        $scope.$on('$stateChangeStart', function () {
            $scope.modal.hide();
          });


    $scope.ktheMonedhe=function(){
      $scope.shfaqMonedhenTjeter=!$scope.shfaqMonedhenTjeter;
    }

        
  


    $scope.provoVirtual=function (item){
    if (item=="" || item==undefined) {
          alert("Empty");
        }else {
    window.localStorage.setItem('provoVirtualKod', item);
    window.location = "#/app/sherbime/try-on";
  }

  }
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.alreadyExistWishlist=false;

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
        for (var i = 0; i < numriWish.length; i++) {
            if (numriWish[i] === $stateParams.productId) {
                $scope.alreadyExistWishlist=true;
            }
        }
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }
       }

  console.log($stateParams.productId);
  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/product-single',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         productId : $stateParams.productId
       }
     }).success(function(response) {
      console.log(response);
         $scope.syze = response[0].produkti;
         
         $scope.syze.pershkrimiangartikulli=$scope.syze.pershkrimiangartikulli.slice(3);
         


         $scope.pershkrimiSakte=$scope.syze.tedhenateknike.split(';');
         //console.log($scope.pershkrimiSakte);
         $scope.syze.masaA=$scope.pershkrimiSakte[0];
         $scope.syze.bridge=$scope.pershkrimiSakte[1];
         $scope.syze.bishti=$scope.pershkrimiSakte[2];
         console.log($scope.syze);

        var cmimiriModel=$scope.syze.kodidoganorartikulli.split(';');
        //console.log(cmimiriModel);
         $scope.syze.koleksioni=cmimiriModel[0];
        if(cmimiriModel[1]==undefined || cmimiriModel[2]==undefined){
          $scope.syze.promocioni="";
          $scope.syze.cmimiPromoLek="";
          $scope.syze.cmimiPromoEur="";
        }else{
          //var replaced = str.split(' ').join('+');
          $scope.syze.promocioni=cmimiriModel[1];
          $scope.syze.cmimiPromoLek=cmimiriModel[2];
          $scope.syze.cmimiPromoEur=cmimiriModel[3];
          }



         // $scope.syze.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');


         // Split the string and get all the views in an array 
         $scope.syzeView=$scope.syze.vendodhjeartikulli.split(';');

         // Split the view into 2 parts: the id and the view direction
         $scope.syzeView.forEach(function(item,indexB){
            var res = item.split("_");

            // If the view direction is list then shift it to the first place
            res.forEach( function(element, index) {
              if (element=="list") {
                $scope.syzeView.splice(indexB, 1);
                $scope.syzeView.unshift(item);
              }
              
            });

          
          });

         window.onload = function() {
              // this will fire after the entire page is loaded, including images
              console.log("after images");
          };

         // console.log($scope.syzeView);
         // jQuery('.slider-slides,.slider-slide').width('100%');
         // $ionicSlideBoxDelegate.update();

         if ($scope.syze.sasia<=5){
          $scope.shfaqGjendjenOrange=true;
         }else{
          $scope.shfaqGjendjenGreen=true;
         }







         $scope.ngjyratSyze=response[1];
         console.log($scope.ngjyratSyze);
      });

     
     var i=1;
     $scope.updateSlider = function () {
      i++;
      if ($scope.syzeView.length==i) {
        console.log('1 here e fundit');
         $ionicSlideBoxDelegate.update();
         $scope.showSpinner=false;
      }
            //or just return the function
      }




      $scope.addToWishlist = function(item) {
        $scope.alreadyExistWishlist=true;
        // window.localStorage eshte si session ne php
        console.log("item "+item);

        $scope.items = [];
        // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
        $scope.add = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'WISHLIST',
            template: '<p align="center">Produkti u shtua ne Wishlisten tuaj!</p>'
          });
        };
        // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
        $scope.exists = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'WISHLIST',
            template: '<p align="center">Produkti i zgjedhur ndodhet ne Wishlisten tuaj!</p>'
          });
        };
        // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
        if (window.localStorage.getItem('wishlist')) {
          $scope.items = window.localStorage.getItem('wishlist').split(",");
        }
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=item.target.id;
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.itemsFullData = [];
           $rootScope.itemsFullData.push(produktD);
          console.log($rootScope.itemsFullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items.push(id);
          $scope.add();
        } else {
          $scope.exists();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('wishlist', $scope.items);


        var numriWish=[];
        var wishlistItems=window.localStorage.getItem('wishlist');
        numriWish=wishlistItems.split(',');
        
         if (numriWish[0]=="") {
          // console.log('po jam bosh');
          $scope.wishlistItemsLength=null;
         }else {
           $scope.wishlistItemsLength=numriWish.length;
         }

      };



        $scope.shtoNeShporte = function(itemm) {
        // window.localStorage eshte si session ne php
        console.log("item "+itemm);

        $scope.items2 = [];
        // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
        $scope.addd = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti u shtua ne shporten tuaj!</p>'
          });
        };
        // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
        $scope.existss = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti i zgjedhur ndodhet ne shporten tuaj!</p>'
          });
        };
        // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
        if (window.localStorage.getItem('shporta')) {
          $scope.items2 = window.localStorage.getItem('shporta').split(",");
        }
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=itemm.target.id;
          console.log(produktD);
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.items2FullData = [];
           $rootScope.items2FullData.push(produktD);
          console.log($rootScope.items2FullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items2.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items2.push(id);
          $scope.addd();
        } else {
          $scope.existss();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('shporta', $scope.items2);

        var numriShport=[];
        var shportlistItems=window.localStorage.getItem('shporta');
        // console.log(shportlistItems);
        numriShport=shportlistItems.split(',');
        // console.log(numriShport);
        
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
        };

       var treArrayGet = localStorage.getItem('treArray'); 
       
       $scope.treArrayAll=JSON.parse(treArrayGet);
       console.log($scope.treArrayAll);


})


.controller('lenteSingleCtrl',function($scope, $state,$stateParams,$http, $ionicPopup, $rootScope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicModal,$ionicScrollDelegate, $location){

    $scope.showSpinner=true;
    $scope.shfaqMonedhenTjeter=true;
    $scope.showlentePorosi=false;




        $scope.$on('$stateChangeStart', function () {
            $scope.modal.hide();
          });


    $scope.ktheMonedhe=function(){
      $scope.shfaqMonedhenTjeter=!$scope.shfaqMonedhenTjeter;
    }

    $scope.porositLente = function() {
    if ($scope.showlentePorosi==true) {
      $scope.showlentePorosi=false;
    }else{
      $scope.showlentePorosi=true;
      $location.hash('lentePorosi');   //set the location hash
      var handle = $ionicScrollDelegate.$getByHandle('lenteDelegate');
      handle.anchorScroll(true);  // 'true' for animation
    }
  }

        
  


    $ionicSideMenuDelegate.canDragContent(false);
    $scope.alreadyExistWishlist=false;

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
        for (var i = 0; i < numriWish.length; i++) {
            if (numriWish[i] === $stateParams.productId) {
                $scope.alreadyExistWishlist=true;
            }
        }
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }
       }

  console.log($stateParams.productId);
  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/product-single',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         productId : $stateParams.productId
       }
     }).success(function(response) {
      console.log(response);
         $scope.syze = response[0].produkti;
         console.log($scope.syze);


         // $scope.pershkrimiSakte=$scope.syze.pershkrimartikulli.split(' ');
         // if ($scope.pershkrimiSakte[0]=="Emporio" || $scope.pershkrimiSakte[0]=="Ray" || $scope.pershkrimiSakte[0]=="RAY" || $scope.pershkrimiSakte[0]=="EMPORIO") {
         //  $scope.pershkrimiSakte.length=3;
         // }else if($scope.pershkrimiSakte[0]=="DOLCE" || $scope.pershkrimiSakte[0]=="Dolce"){
         //  $scope.pershkrimiSakte.length=4;
         // }else{
         //  // $scope.pershkrimiSakte=$scope.pershkrimiSakte.splice(-0,3);
         //  $scope.pershkrimiSakte.length=2;
         // }
         // $scope.syze.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');


         // Split the string and get all the views in an array 
         $scope.syzeView=$scope.syze.vendodhjeartikulli.split(';');

         // Split the view into 2 parts: the id and the view direction
         $scope.syzeView.forEach(function(item,indexB){
            var res = item.split("_");

            // If the view direction is list then shift it to the first place
            res.forEach( function(element, index) {
              if (element=="list") {
                $scope.syzeView.splice(indexB, 1);
                $scope.syzeView.unshift(item);
              }
              
            });

          
          });

         window.onload = function() {
              // this will fire after the entire page is loaded, including images
              console.log("after images");
          };

         // console.log($scope.syzeView);
         // jQuery('.slider-slides,.slider-slide').width('100%');
         // $ionicSlideBoxDelegate.update();







         $scope.ngjyratSyze=response[1];
         console.log($scope.ngjyratSyze);
      });

     
     var i=1;
     $scope.updateSlider = function () {
      i++;
      if ($scope.syzeView.length==i) {
        console.log('1 here e fundit');
         $ionicSlideBoxDelegate.update();
         $scope.showSpinner=false;
      }
            //or just return the function
      }




      $scope.addToWishlist = function(item) {
        $scope.alreadyExistWishlist=true;
        // window.localStorage eshte si session ne php
        console.log("item "+item);

        $scope.items = [];
        // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
        $scope.add = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'WISHLIST',
            template: '<p align="center">Produkti u shtua ne Wishlisten tuaj!</p>'
          });
        };
        // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
        $scope.exists = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'WISHLIST',
            template: '<p align="center">Produkti i zgjedhur ndodhet ne Wishlisten tuaj!</p>'
          });
        };
        // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
        if (window.localStorage.getItem('wishlist')) {
          $scope.items = window.localStorage.getItem('wishlist').split(",");
        }
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=item.target.id;
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.itemsFullData = [];
           $rootScope.itemsFullData.push(produktD);
          console.log($rootScope.itemsFullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items.push(id);
          $scope.add();
        } else {
          $scope.exists();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('wishlist', $scope.items);


        var numriWish=[];
        var wishlistItems=window.localStorage.getItem('wishlist');
        numriWish=wishlistItems.split(',');
        
         if (numriWish[0]=="") {
          // console.log('po jam bosh');
          $scope.wishlistItemsLength=null;
         }else {
           $scope.wishlistItemsLength=numriWish.length;
         }

      };



        $scope.shtoNeShporte = function(itemm) {
        // window.localStorage eshte si session ne php
        console.log("item "+itemm);

        $scope.items2 = [];
        // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
        $scope.addd = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti u shtua ne shporten tuaj!</p>'
          });
        };
        // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
        $scope.existss = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti i zgjedhur ndodhet ne shporten tuaj!</p>'
          });
        };
        // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
        if (window.localStorage.getItem('shporta')) {
          $scope.items2 = window.localStorage.getItem('shporta').split(",");
        }
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=itemm.target.id;
          console.log(produktD);
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.items2FullData = [];
           $rootScope.items2FullData.push(produktD);
          console.log($rootScope.items2FullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items2.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items2.push(id);
          $scope.addd();
        } else {
          $scope.existss();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('shporta', $scope.items2);

        var numriShport=[];
        var shportlistItems=window.localStorage.getItem('shporta');
        // console.log(shportlistItems);
        numriShport=shportlistItems.split(',');
        // console.log(numriShport);
        
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
        };

       var treArrayGet = localStorage.getItem('treArray'); 
       
       $scope.treArrayAll=JSON.parse(treArrayGet);
       console.log($scope.treArrayAll);


})

.controller('produkteCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offset = 0;
  $scope.syze   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/kreu',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offset
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syze.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offset += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

.controller('slider1Ctrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http, $timeout, $rootScope) {
  console.log("test");
  console.log($scope.offsetD);

  $scope.$watch('$viewContentLoaded', function(){
    //do something
    console.log('do thirrem ne fund fare');
});


$scope.itemchecked=false;
$scope.filterNotActivated=true;
$scope.data.gjinia=[];
$scope.skaRezultat=false;
$scope.moreDataCanBeLoaded=true;



// $scope.shfaqFiltraTag=false;
// var defaultMinPrice=0;
// var defaultMaxPrice=100;

// $scope.slider = {
//   minValue: defaultMinPrice,
//   maxValue: defaultMaxPrice,
//   options: {
//     floor: defaultMinPrice,
//     ceil: defaultMaxPrice,
//     translate: function(value, sliderId, label) {
//       switch (label) {
//         case 'model':
//           return '<b>Cmimi Min:</b> '+value+' LEK';
//         case 'high':
//           return '<b>Cmimi Max:</b> '+value+' LEK';
//         default:
//           return '$' + value
//       }
//     }
//   }
// };


//   $http({
//        method: 'POST',
//        //url: 'https://tarzantest.herokuapp.com/login',
//        url: 'https://max-optika-server.herokuapp.com/getCmimiFilter',
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded'
//        },
//        transformRequest: function(obj) {
//          var str = [];
//          for (var p in obj)
//            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//          return str.join("&");
//        },
//      }).success(function(response) {
//         //console.log(response.rows);

//         response.rows.forEach( function(element, index) {
//           console.log(element);
//           if (element.id==1) {
//              $scope.slider.options.floor=element.cmimimin;
//              $scope.slider.options.ceil=element.cmimimax;
//              $scope.slider.minValue=element.cmimimin;
//              $scope.slider.maxValue=element.cmimimax;
//             }
//         });


          
//       });



// $scope.shfaqF= function(){
//   $scope.data.shfaq=true;
//   $timeout(function () { 
//     $scope.$broadcast('rzSliderForceRender');
//     console.log('koha') 
//   });
// }

// $scope.shfaqF2= function(){
//   $scope.data.shfaq=false;
// }




//   $scope.singleModel = 1;

//   $scope.radioModel = 'Middle';

//   $scope.checkModel = {
//     Rayban: false,
//     Police: false,
//     Emporio: false
//   };

//   $scope.checkResults = [];




//   $scope.$watchCollection('checkModel', function () {
//     $scope.checkResults = [];
//     angular.forEach($scope.checkModel, function (value, key) {
//       if (value) {
//         $scope.checkResults.push(key);
//       }
//     });
//   });


//   $scope.singleModel = 1;

//   $scope.radioModel = 'Middle';

//   $scope.checkModelForma = {
//     Square: false,
//     Circle: false,
//     Oval: false
//   };

//   $scope.checkResultsForma = [];

//   $scope.$watchCollection('checkModelForma', function () {
//     $scope.checkResultsForma = [];
//     angular.forEach($scope.checkModelForma, function (value, key) {
//       if (value) {
//         $scope.checkResultsForma.push(key);
//       }
//     });
//   });



// $scope.klasaSfond=['product--blue','product--orange','product--red','product--green','product--yellow','product--pink'];

// $scope.ktheNgjyre= function(index){
//   var kodi=index%6;
//   if(kodi==0){
//     kodi=6;
//   }
//   return kodi
// }


// Chech which filter tag to show and which one not
// $scope.checkFilterValues=function(){
//   $scope.fshihCmimeVar=false;
//   $scope.fshihFormaVar=false;
//   $scope.fshihGjiniaVar=false;
//   $scope.fshihMarkaVar=false;
//   $scope.filterNotActivated=true;



//   if ($scope.slider.minValue == defaultMinPrice && $scope.slider.maxValue == defaultMaxPrice) {
//     $scope.fshihCmimeVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }

//   if ($scope.checkResultsForma=='') {
//     $scope.fshihFormaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//     $scope.fshihFormaVar=false;
//   }

//   if($scope.data.gjinia==undefined || $scope.data.gjinia==''){
//     $scope.fshihGjiniaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }

//   if ($scope.checkResults=='') {
//     $scope.fshihMarkaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }


// }

// $scope.data.gjinia=new Array(' ');

// $scope.filtroProduktet =  function(){
//   $scope.checkFilterValues();
//   console.log($scope.syzeD);
//   //$scope.syzeDCopy=$scope.syzeDOriginalBackup;
//   console.log($scope.syzeDOriginalBackup);
//   var newSyzeDHolder1=[];
//   var newSyzeDHolder2=[];
//   var newSyzeDHolder3=[];
//   var newSyzeDHolder4=[];

//   // Cmimi Filter
//   $scope.syzeDOriginalBackup.forEach( function(element, index) {
//     if(element.cmimi>=$scope.slider.minValue && element.cmimi<=$scope.slider.maxValue){
//       newSyzeDHolder1.push(element);
//     }
//   });

//   // Forma Filter
//   // Check if any value is selected from Forma
//   if ($scope.checkResultsForma!='') {
//     // First loop through the array of all the products
//     newSyzeDHolder1.forEach( function(element, index) {
//       // Then loop through all the selected Forma values and check them all with the products values
//       $scope.checkResultsForma.forEach( function(elementt, indexx) {
//         if(element.zonakadastrale==elementt){
//         newSyzeDHolder2.push(element);
//       }
//       });
      
//     });
//   }else{
//     newSyzeDHolder2=newSyzeDHolder1;
//   }

//   // Gjinia Filter
//   if($scope.data.gjinia.length>0){
//     //console.log('brenda gjinia');
//     newSyzeDHolder2.forEach( function(element, index) {
//       if(element.vitprodhimi==$scope.data.gjinia){
//         newSyzeDHolder3.push(element);
//       }
//     });

//   }else{
//     //console.log('jo brenda gjinia');
//     newSyzeDHolder3=newSyzeDHolder2;
//   }

//   // Marka Filter
//   // Check if any value is selected from Forma
//   if ($scope.checkResults!='') {
//     // Replace Emporio with Emporio Armani in the result array
//     $scope.checkResults.forEach( function(element, index) {
//       if(element=='Emporio'){
//         $scope.checkResults[index]='Emporio Armani';
//       }
//     });

//     // First loop through the array of all the products
//     newSyzeDHolder3.forEach( function(element, index) {
//       // Then loop through all the selected Forma values and check them all with the products values
//       $scope.checkResults.forEach( function(elementt, indexx) {
//         if(element.kodifikimartikulli2==elementt){
//         newSyzeDHolder4.push(element);
//       }
//       });
      
//     });
//   }else{
//     newSyzeDHolder4=newSyzeDHolder3;
//   }

//   $scope.shfaqFiltraTag=true;
//   // if filter don't return any result then don't change a thing
//   if(newSyzeDHolder4==''){
//     $scope.skaRezultat=true;

//     $timeout(function () { 
//       $scope.skaRezultat = false; 
//     }, 3000);

//     console.log("bosh 2");
//     $scope.data.shfaq=false;
//   }else {
//       // Set the old array to the new modified one
//       $scope.syzeD=newSyzeDHolder4;
//       console.log($scope.syzeD);
//       $scope.data.shfaq=false;
//   }






// }



// Delete the Cmimi filters
// $scope.fshiCmimiFilter =function(){
//   //console.log($scope.slider);
//   $scope.slider.minValue= defaultMinPrice;
//   $scope.slider.maxValue= defaultMaxPrice;
//   $scope.fshihCmimeVar=true;
//   // TODO: Call filtroProduktet and filter them again
//   $scope.filtroProduktet();
// }


// // Delete the Forma filters
// $scope.fshiFormaFilter =function(){
//   for (var key in $scope.checkModelForma) {
//   if ($scope.checkModelForma.hasOwnProperty(key)) {
//     $scope.checkResultsForma.forEach( function(element, index) {
//       if (key==element) {
//         $scope.checkModelForma[key]=false;
//       }
//     });
//   }
// }

//   $scope.checkResultsForma=[];
//   $scope.filtroProduktet();
//   $scope.fshihFormaVar=true;
// }


// // Delete the gjinia filters
// $scope.fshiGjiniaFilter =function(){
//   $scope.data.gjinia=[];
//   $scope.fshihGjiniaVar=true;
//   // TODO: Call filtroProduktet and filter them again
//   $scope.filtroProduktet();
// }


// // Delete the marka filters
// $scope.fshiMarkaFilter =function(){
//   //console.log($scope.checkModel);
//   //console.log($scope.checkResults);
//   for (var key in $scope.checkModel) {
//   if ($scope.checkModel.hasOwnProperty(key)) {
//     $scope.checkResults.forEach( function(element, index) {
//       if(element=='Emporio Armani'){
//         $scope.checkResults[index]='Emporio';
//       }
//       if (key==element) {
//         $scope.checkModel[key]=false;
//       }
//     });
//   }
// }

//   $scope.checkResults=[];
//   $scope.filtroProduktet();
//   $scope.fshihMarkaVar=true;

// }










      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeD   = [];
  $scope.countForBackUp   = 1;
  $scope.loadNextProducts = function(){
      // $scope.fshihCmimeVar=false;
      // $scope.fshihFormaVar=false;
      // $scope.fshihGjiniaVar=false;
      // $scope.fshihMarkaVar=false;

    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/slider1',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);
      if (response.length==0) {
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreDataCanBeLoaded=false;

        var alertPopup = $ionicPopup.alert({
          title: 'Syze Dielli',
          template: '<p align="center">Nuk ka me produkte ne oferte!</p>'
        });
        //alert('Nuk ka aksesore per tu shfaqur');
      }else{
       


       response.forEach(function(item){
        $scope.syzeD.push(item);

        

      });

       $scope.syzeD.forEach( function(element, index) {
         $scope.pershkrimiSakte=element.pershkrimartikulli.split(' ');
         if ($scope.pershkrimiSakte[0]=="Emporio" || $scope.pershkrimiSakte[0]=="Ray" || $scope.pershkrimiSakte[0]=="RAY" || $scope.pershkrimiSakte[0]=="EMPORIO") {
          $scope.pershkrimiSakte.length=3;
         }else{
          // $scope.pershkrimiSakte=$scope.pershkrimiSakte.splice(-0,3);
          $scope.pershkrimiSakte.length=2;
         }
         element.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');

       });


       if ($scope.filterNotActivated==false) {
        console.log('eshte aktivizuar');
        $scope.filtroProduktet();
       }else{
        console.log('nuk eshte aktivizuar');
       }

       if($scope.countForBackUp==1){
        $scope.syzeDOriginalBackup=$scope.syzeD;
        console.log("First and only call");
       }
       



       $scope.$broadcast('scroll.infiniteScrollComplete');
       // localStorage.setItem('treArray', JSON.stringify($scope.treArray));
       // console.log($scope.treArray);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);
     }
     });

     console.log("fs");
  // $scope.fshihCmimeVar=false;
  console.log($scope.fshihCmimeVar);

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  

})


.controller('slider2Ctrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http, $timeout, $rootScope) {
  console.log("test");
  console.log($scope.offsetD);

  $scope.$watch('$viewContentLoaded', function(){
    //do something
    console.log('do thirrem ne fund fare');
});


$scope.itemchecked=false;
$scope.filterNotActivated=true;
$scope.data.gjinia=[];
$scope.skaRezultat=false;
$scope.moreDataCanBeLoaded=true;



// $scope.shfaqFiltraTag=false;
// var defaultMinPrice=0;
// var defaultMaxPrice=100;

// $scope.slider = {
//   minValue: defaultMinPrice,
//   maxValue: defaultMaxPrice,
//   options: {
//     floor: defaultMinPrice,
//     ceil: defaultMaxPrice,
//     translate: function(value, sliderId, label) {
//       switch (label) {
//         case 'model':
//           return '<b>Cmimi Min:</b> '+value+' LEK';
//         case 'high':
//           return '<b>Cmimi Max:</b> '+value+' LEK';
//         default:
//           return '$' + value
//       }
//     }
//   }
// };


//   $http({
//        method: 'POST',
//        //url: 'https://tarzantest.herokuapp.com/login',
//        url: 'https://max-optika-server.herokuapp.com/getCmimiFilter',
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded'
//        },
//        transformRequest: function(obj) {
//          var str = [];
//          for (var p in obj)
//            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//          return str.join("&");
//        },
//      }).success(function(response) {
//         //console.log(response.rows);

//         response.rows.forEach( function(element, index) {
//           console.log(element);
//           if (element.id==1) {
//              $scope.slider.options.floor=element.cmimimin;
//              $scope.slider.options.ceil=element.cmimimax;
//              $scope.slider.minValue=element.cmimimin;
//              $scope.slider.maxValue=element.cmimimax;
//             }
//         });


          
//       });



// $scope.shfaqF= function(){
//   $scope.data.shfaq=true;
//   $timeout(function () { 
//     $scope.$broadcast('rzSliderForceRender');
//     console.log('koha') 
//   });
// }

// $scope.shfaqF2= function(){
//   $scope.data.shfaq=false;
// }




//   $scope.singleModel = 1;

//   $scope.radioModel = 'Middle';

//   $scope.checkModel = {
//     Rayban: false,
//     Police: false,
//     Emporio: false
//   };

//   $scope.checkResults = [];




//   $scope.$watchCollection('checkModel', function () {
//     $scope.checkResults = [];
//     angular.forEach($scope.checkModel, function (value, key) {
//       if (value) {
//         $scope.checkResults.push(key);
//       }
//     });
//   });


//   $scope.singleModel = 1;

//   $scope.radioModel = 'Middle';

//   $scope.checkModelForma = {
//     Square: false,
//     Circle: false,
//     Oval: false
//   };

//   $scope.checkResultsForma = [];

//   $scope.$watchCollection('checkModelForma', function () {
//     $scope.checkResultsForma = [];
//     angular.forEach($scope.checkModelForma, function (value, key) {
//       if (value) {
//         $scope.checkResultsForma.push(key);
//       }
//     });
//   });



// $scope.klasaSfond=['product--blue','product--orange','product--red','product--green','product--yellow','product--pink'];

// $scope.ktheNgjyre= function(index){
//   var kodi=index%6;
//   if(kodi==0){
//     kodi=6;
//   }
//   return kodi
// }


// // Chech which filter tag to show and which one not
// $scope.checkFilterValues=function(){
//   $scope.fshihCmimeVar=false;
//   $scope.fshihFormaVar=false;
//   $scope.fshihGjiniaVar=false;
//   $scope.fshihMarkaVar=false;
//   $scope.filterNotActivated=true;



//   if ($scope.slider.minValue == defaultMinPrice && $scope.slider.maxValue == defaultMaxPrice) {
//     $scope.fshihCmimeVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }

//   if ($scope.checkResultsForma=='') {
//     $scope.fshihFormaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//     $scope.fshihFormaVar=false;
//   }

//   if($scope.data.gjinia==undefined || $scope.data.gjinia==''){
//     $scope.fshihGjiniaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }

//   if ($scope.checkResults=='') {
//     $scope.fshihMarkaVar=true;
//   }else{
//     $scope.filterNotActivated=false;
//   }


// }

// $scope.data.gjinia=new Array(' ');

// $scope.filtroProduktet =  function(){
//   $scope.checkFilterValues();
//   console.log($scope.syzeD);
//   //$scope.syzeDCopy=$scope.syzeDOriginalBackup;
//   console.log($scope.syzeDOriginalBackup);
//   var newSyzeDHolder1=[];
//   var newSyzeDHolder2=[];
//   var newSyzeDHolder3=[];
//   var newSyzeDHolder4=[];

//   // Cmimi Filter
//   $scope.syzeDOriginalBackup.forEach( function(element, index) {
//     if(element.cmimi>=$scope.slider.minValue && element.cmimi<=$scope.slider.maxValue){
//       newSyzeDHolder1.push(element);
//     }
//   });

//   // Forma Filter
//   // Check if any value is selected from Forma
//   if ($scope.checkResultsForma!='') {
//     // First loop through the array of all the products
//     newSyzeDHolder1.forEach( function(element, index) {
//       // Then loop through all the selected Forma values and check them all with the products values
//       $scope.checkResultsForma.forEach( function(elementt, indexx) {
//         if(element.zonakadastrale==elementt){
//         newSyzeDHolder2.push(element);
//       }
//       });
      
//     });
//   }else{
//     newSyzeDHolder2=newSyzeDHolder1;
//   }

//   // Gjinia Filter
//   if($scope.data.gjinia.length>0){
//     //console.log('brenda gjinia');
//     newSyzeDHolder2.forEach( function(element, index) {
//       if(element.vitprodhimi==$scope.data.gjinia){
//         newSyzeDHolder3.push(element);
//       }
//     });

//   }else{
//     //console.log('jo brenda gjinia');
//     newSyzeDHolder3=newSyzeDHolder2;
//   }

//   // Marka Filter
//   // Check if any value is selected from Forma
//   if ($scope.checkResults!='') {
//     // Replace Emporio with Emporio Armani in the result array
//     $scope.checkResults.forEach( function(element, index) {
//       if(element=='Emporio'){
//         $scope.checkResults[index]='Emporio Armani';
//       }
//     });

//     // First loop through the array of all the products
//     newSyzeDHolder3.forEach( function(element, index) {
//       // Then loop through all the selected Forma values and check them all with the products values
//       $scope.checkResults.forEach( function(elementt, indexx) {
//         if(element.kodifikimartikulli2==elementt){
//         newSyzeDHolder4.push(element);
//       }
//       });
      
//     });
//   }else{
//     newSyzeDHolder4=newSyzeDHolder3;
//   }

//   $scope.shfaqFiltraTag=true;
//   // if filter don't return any result then don't change a thing
//   if(newSyzeDHolder4==''){
//     $scope.skaRezultat=true;

//     $timeout(function () { 
//       $scope.skaRezultat = false; 
//     }, 3000);

//     console.log("bosh 2");
//     $scope.data.shfaq=false;
//   }else {
//       // Set the old array to the new modified one
//       $scope.syzeD=newSyzeDHolder4;
//       console.log($scope.syzeD);
//       $scope.data.shfaq=false;
//   }






// }



// // Delete the Cmimi filters
// $scope.fshiCmimiFilter =function(){
//   //console.log($scope.slider);
//   $scope.slider.minValue= defaultMinPrice;
//   $scope.slider.maxValue= defaultMaxPrice;
//   $scope.fshihCmimeVar=true;
//   // TODO: Call filtroProduktet and filter them again
//   $scope.filtroProduktet();
// }


// // Delete the Forma filters
// $scope.fshiFormaFilter =function(){
//   for (var key in $scope.checkModelForma) {
//   if ($scope.checkModelForma.hasOwnProperty(key)) {
//     $scope.checkResultsForma.forEach( function(element, index) {
//       if (key==element) {
//         $scope.checkModelForma[key]=false;
//       }
//     });
//   }
// }

//   $scope.checkResultsForma=[];
//   $scope.filtroProduktet();
//   $scope.fshihFormaVar=true;
// }


// // Delete the gjinia filters
// $scope.fshiGjiniaFilter =function(){
//   $scope.data.gjinia=[];
//   $scope.fshihGjiniaVar=true;
//   // TODO: Call filtroProduktet and filter them again
//   $scope.filtroProduktet();
// }


// // Delete the marka filters
// $scope.fshiMarkaFilter =function(){
//   //console.log($scope.checkModel);
//   //console.log($scope.checkResults);
//   for (var key in $scope.checkModel) {
//   if ($scope.checkModel.hasOwnProperty(key)) {
//     $scope.checkResults.forEach( function(element, index) {
//       if(element=='Emporio Armani'){
//         $scope.checkResults[index]='Emporio';
//       }
//       if (key==element) {
//         $scope.checkModel[key]=false;
//       }
//     });
//   }
// }

//   $scope.checkResults=[];
//   $scope.filtroProduktet();
//   $scope.fshihMarkaVar=true;

// }










      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeD   = [];
  $scope.countForBackUp   = 1;
  $scope.loadNextProducts = function(){
      // $scope.fshihCmimeVar=false;
      // $scope.fshihFormaVar=false;
      // $scope.fshihGjiniaVar=false;
      // $scope.fshihMarkaVar=false;

    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/slider2',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);

      if (response.length==0) {
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreDataCanBeLoaded=false;

        var alertPopup = $ionicPopup.alert({
          title: 'Syze Dielli',
          template: '<p align="center">Nuk ka me produkte ne oferte!</p>'
        });
        //alert('Nuk ka aksesore per tu shfaqur');
      }else{
       


       response.forEach(function(item){
        $scope.syzeD.push(item);

        

      });

       $scope.syzeD.forEach( function(element, index) {
         $scope.pershkrimiSakte=element.pershkrimartikulli.split(' ');
         if ($scope.pershkrimiSakte[0]=="Emporio" || $scope.pershkrimiSakte[0]=="Ray" || $scope.pershkrimiSakte[0]=="RAY" || $scope.pershkrimiSakte[0]=="EMPORIO") {
          $scope.pershkrimiSakte.length=3;
         }else{
          // $scope.pershkrimiSakte=$scope.pershkrimiSakte.splice(-0,3);
          $scope.pershkrimiSakte.length=2;
         }
         element.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');

       });


       if ($scope.filterNotActivated==false) {
        console.log('eshte aktivizuar');
        $scope.filtroProduktet();
       }else{
        console.log('nuk eshte aktivizuar');
       }

       if($scope.countForBackUp==1){
        $scope.syzeDOriginalBackup=$scope.syzeD;
        console.log("First and only call");
       }
       




       // localStorage.setItem('treArray', JSON.stringify($scope.treArray));
       // console.log($scope.treArray);
      $scope.$broadcast('scroll.infiniteScrollComplete');
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);
     }
     });

     console.log("fs");
  // $scope.fshihCmimeVar=false;
  console.log($scope.fshihCmimeVar);

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  

})




.controller('syzeDielliCtrl', function($scope, Syze, $location, $sce, $state, $ionicLoading, $ionicPopup, $http, $timeout, $rootScope, $ionicScrollDelegate) {
  console.log("test");
  console.log($scope.offsetD);

  $scope.$watch('$viewContentLoaded', function(){
    //do something
    console.log('do thirrem ne fund fare');
});

  $scope.moreDataCanBeLoaded=true;
  // $scope.shfaqPoshte=true;

  // $scope.callPoshte=function(){
  //   console.log('called poshte');
  //   $timeout(function () { 
  //       $scope.shfaqPoshte = !$scope.shfaqPoshte; 
  //       $scope.shfaqq=$scope.shfaqPoshte;
  //       $scope.callPoshte();
  //       console.log($scope.shfaqPoshte);
  //   }, 15000);
  // }




  // $scope.callPoshte();

  // $scope.checkScroll = function () {
  //       var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
  //       var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

  //       if (currentTop >= maxTop)
  //       {
  //           // hit the bottom
  //         $scope.shfaqPoshte=false;
  //       }else{
  //         $scope.shfaqPoshte=true;
  //       }
  //   };


  $scope.active = 'lek';
  $scope.shfaqLek=true;

  $scope.setActive = function(type) {
    $scope.active = type;
    if(type=='lek'){
      $scope.shfaqLek=true;
    }else{
      $scope.shfaqLek=false;
    }
  };

  $scope.isActive = function(type){
    return type === $scope.active;
  };


$scope.checkPromotion=function(promo){
  if (promo==undefined || promo =='') {
    // Do nothing
    // return "nope";
  }else if(promo=='New Collection'){

    return "img/promotions/new-collection.png";

  }else if(promo=='New Style'){

    return "img/promotions/new-style.png";

  }else if(promo=='New Color'){

    return "img/promotions/new-color.png";
  }

}




   


$scope.itemchecked=false;
$scope.filterNotActivated=true;
$scope.data.gjinia=[];
$scope.skaRezultat=false;



$scope.shfaqFiltraTag=false;
var defaultMinPrice=0;
var defaultMaxPrice=100;

$scope.slider = {
  minValue: defaultMinPrice,
  maxValue: defaultMaxPrice,
  options: {
    floor: defaultMinPrice,
    ceil: defaultMaxPrice,
    translate: function(value, sliderId, label) {
      switch (label) {
        case 'model':
          return '<b>Cmimi Min:</b> '+value+' LEK';
        case 'high':
          return '<b>Cmimi Max:</b> '+value+' LEK';
        default:
          return value + ' LEK'
      }
    }
  }
};


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/getCmimiFilter',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
     }).success(function(response) {
        //console.log(response.rows);

        response.rows.forEach( function(element, index) {
          console.log(element);
          if (element.id==1) {
             $scope.slider.options.floor=element.cmimimin;
             $scope.slider.options.ceil=element.cmimimax;
             $scope.slider.minValue=element.cmimimin;
             $scope.slider.maxValue=element.cmimimax;
             $scope.cmimiMinF=element.cmimimin;
             $scope.cmimiMaxF=element.cmimimax;
            }
        });


          
      });



$scope.shfaqF= function(){
  $scope.data.shfaq=true;
  // $timeout(function () { 
  //   $scope.$broadcast('rzSliderForceRender');
  //   console.log('koha') 
  // });
}

$scope.shfaqF2= function(){
  $scope.data.shfaq=false;
}

$scope.shfaqCmimiRender= function(){
  $timeout(function () { 
    $scope.$broadcast('rzSliderForceRender');
    console.log('koha') 
  });
}




  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    Rayban: false,
    Police: false,
    Emporio: false
  };

  $scope.checkResults = [];




  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });


  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModelGjinia = {
    Woman: false,
    Man: false,
    Unisex: false
  };

  $scope.checkResultsGjinia = [];

  $scope.$watchCollection('checkModelGjinia', function () {
    $scope.checkResultsGjinia = [];
    angular.forEach($scope.checkModelGjinia, function (value, key) {
      if (value) {
        $scope.checkResultsGjinia.push(key);
      }
    });
  });



$scope.klasaSfond=['product--blue','product--orange','product--red','product--green','product--yellow','product--pink'];

$scope.ktheNgjyre= function(index){
  var kodi=index%6;
  if(kodi==0){
    kodi=6;
  }
  return kodi
}

$scope.filter={};
$scope.filterM={};
$scope.formatZgjedhur=[];
$scope.markatZgjedhur=[];

$scope.printC = function() {
  $scope.formatZgjedhur=[];
    console.log($scope.filter);
        for(i in $scope.filter) {
        console.log($scope.filter[i]);
        if($scope.filter[i] == true) {
            $scope.formatZgjedhur.push(i);
        }
    }
    console.log($scope.formatZgjedhur);
}

$scope.getMarka = function() {
  $scope.markatZgjedhur=[];
    console.log($scope.filterM);
        for(i in $scope.filterM) {
        console.log($scope.filterM[i]);
        if($scope.filterM[i] == true) {
            $scope.markatZgjedhur.push(i);
        }
    }
    console.log($scope.markatZgjedhur);
}





// Chech which filter tag to show and which one not
$scope.checkFilterValues=function(){
  $scope.fshihCmimeVar=false;
  $scope.fshihFormaVar=false;
  $scope.fshihGjiniaVar=false;
  $scope.fshihMarkaVar=false;
  $scope.filterNotActivated=true;



  if ($scope.slider.minValue == $scope.cmimiMinF && $scope.slider.maxValue == $scope.cmimiMaxF) {
    $scope.fshihCmimeVar=true;
  }else{
    $scope.filterNotActivated=false;
  }

  if ($scope.checkResultsGjinia=='') {
    $scope.fshihGjiniaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihGjiniaVar=false;
  }

  if ($scope.formatZgjedhur=='') {
    $scope.fshihFormaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihFormaVar=false;
  }

  if ($scope.markatZgjedhur=='') {
    $scope.fshihMarkaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihMarkaVar=false;
  }


}

$scope.data.gjinia=new Array(' ');

$scope.filtroProduktet =  function(){

  $scope.moreDataCanBeLoaded=false;
  $scope.checkFilterValues();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
  console.log($scope.syzeD);
  //$scope.syzeDCopy=$scope.syzeDOriginalBackup;
  console.log($scope.syzeDOriginalBackup);
  var newSyzeDHolder1=[];
  var newSyzeDHolder2=[];
  var newSyzeDHolder3=[];
  var newSyzeDHolder4=[];

  // Cmimi Filter
  $scope.syzeDOriginalBackup.forEach( function(element, index) {
    if(element.cmimilek>=$scope.slider.minValue && element.cmimilek<=$scope.slider.maxValue){
      newSyzeDHolder1.push(element);
    }
  });
  console.log(newSyzeDHolder1);

  // Gjinia Filter
  // Check if any value is selected from Gjinia
  if ($scope.checkResultsGjinia!='') {
    
    // First loop through the array of all the products
    newSyzeDHolder1.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.checkResultsGjinia.forEach( function(elementt, indexx) {
        if(element.vitprodhimi==elementt){
        newSyzeDHolder2.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder2=newSyzeDHolder1;
  }
  console.log(newSyzeDHolder2);

  // Forma Filter
  // Check if any value is selected from Forma
  if ($scope.formatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeDHolder2.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.formatZgjedhur.forEach( function(elementt, indexx) {
        if(element.zonakadastrale==elementt){
        newSyzeDHolder3.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder3=newSyzeDHolder2;
  }
  console.log(newSyzeDHolder3);


  // Marka Filter
  // Check if any value is selected from Forma
  if ($scope.markatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeDHolder3.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.markatZgjedhur.forEach( function(elementt, indexx) {
        if(element.kodifikimartikulli2==elementt){
        newSyzeDHolder4.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder4=newSyzeDHolder3;
  }
  console.log(newSyzeDHolder4);
  



  // // Gjinia Filter
  // if($scope.data.gjinia.length>0){
  //   //console.log('brenda gjinia');
  //   newSyzeDHolder2.forEach( function(element, index) {
  //     if(element.vitprodhimi==$scope.data.gjinia){
  //       newSyzeDHolder3.push(element);
  //     }
  //   });

  // }else{
  //   //console.log('jo brenda gjinia');
  //   newSyzeDHolder3=newSyzeDHolder2;
  // }

  // Marka Filter
  // Check if any value is selected from Forma
  // if ($scope.checkResults!='') {
  //   // Replace Emporio with Emporio Armani in the result array
  //   $scope.checkResults.forEach( function(element, index) {
  //     if(element=='Emporio'){
  //       $scope.checkResults[index]='Emporio Armani';
  //     }
  //   });

  //   // First loop through the array of all the products
  //   newSyzeDHolder3.forEach( function(element, index) {
  //     // Then loop through all the selected Forma values and check them all with the products values
  //     $scope.checkResults.forEach( function(elementt, indexx) {
  //       if(element.kodifikimartikulli2==elementt){
  //       newSyzeDHolder4.push(element);
  //     }
  //     });
      
  //   });
  // }else{
  //   newSyzeDHolder4=newSyzeDHolder3;
  // }

  $scope.shfaqFiltraTag=true;
  // if filter don't return any result then don't change a thing
  if(newSyzeDHolder4==''){
    $scope.skaRezultat=true;

    $timeout(function () { 
      $scope.skaRezultat = false; 
    }, 3000);

    console.log("bosh 2");
    $scope.data.shfaq=false;
  }else {
      // Set the old array to the new modified one
      $scope.syzeD=newSyzeDHolder4;
      console.log($scope.syzeD);
      $scope.data.shfaq=false;

  }








}



// Delete the Cmimi filters
$scope.fshiCmimiFilter =function(){
  //console.log($scope.slider);
  $scope.slider.minValue= $scope.cmimiMinF;
  $scope.slider.maxValue= $scope.cmimiMaxF;
  $scope.fshihCmimeVar=true;
  // TODO: Call filtroProduktet and filter them again
  $scope.filtroProduktet();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the Gjinia filters
$scope.fshiGjinia2Filter =function(){
  for (var key in $scope.checkModelGjinia) {
  if ($scope.checkModelGjinia.hasOwnProperty(key)) {
    $scope.checkResultsGjinia.forEach( function(element, index) {
      if (key==element) {
        $scope.checkModelGjinia[key]=false;
      }
    });
  }
}

  $scope.checkResultsGjinia=[];
  $scope.filtroProduktet();
  $scope.fshihGjiniaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}

// Delete the Forma filters
$scope.fshiFormaFilter =function(){
  for (var key in $scope.filter) {
  if ($scope.filter.hasOwnProperty(key)) {
    $scope.formatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filter[key]=false;
      }
    });
  }
}

  $scope.formatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihFormaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the marka filters
$scope.fshiMarkaFilter =function(){
  for (var key in $scope.filterM) {
  if ($scope.filterM.hasOwnProperty(key)) {
    $scope.markatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filterM[key]=false;
      }
    });
  }
}

  $scope.markatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihMarkaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}





$scope.remove_duplicates= function(origArr) {
      var newArr = [],
          origLen = origArr.length,
          found, x, y;

      for (x = 0; x < origLen; x++) {
          found = undefined;
          for (y = 0; y < newArr.length; y++) {
              if (origArr[x] === newArr[y]) {
                  found = true;
                  break;
              }
          }
          if (!found) {
              newArr.push(origArr[x]);
          }
      }
      return newArr;
  }

$scope.cleanArray= function(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }











      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeD   = [];
  $scope.markaSyzesh = [];
  $scope.formaSyzesh = [];
  $scope.countForBackUp   = 1;
  $scope.loadNextProducts = function(){
      // $scope.fshihCmimeVar=false;
      // $scope.fshihFormaVar=false;
      // $scope.fshihGjiniaVar=false;
      // $scope.fshihMarkaVar=false;

    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);

      if (response.length==0) {
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreDataCanBeLoaded=false;

        var alertPopup = $ionicPopup.alert({
          title: 'Syze Dielli',
          template: '<p align="center">Nuk ka syze dielli per tu shfaqur!</p>'
        });
        //alert('Nuk ka aksesore per tu shfaqur');
      }else{
       


       response.forEach(function(item){
        $scope.syzeD.push(item);
        $scope.markaSyzesh.push(item.kodifikimartikulli2);
        $scope.formaSyzesh.push(item.zonakadastrale);

        

      });
       $scope.markaSyzesh = $scope.remove_duplicates($scope.markaSyzesh);
       $scope.formaSyzesh = $scope.remove_duplicates($scope.formaSyzesh);
       $scope.formaSyzesh = $scope.cleanArray($scope.formaSyzesh);
       // console.log($scope.markaSyzesh);
       // console.log($scope.formaSyzesh);

        $scope.syzeD.forEach( function(element, index) {
        element.pershkrimiangartikulliNew=element.pershkrimiangartikulli.slice(3);
        var cmimiriModel=element.kodidoganorartikulli.split(';');
        //console.log(cmimiriModel);
        element.kodidoganorartikulli=cmimiriModel[0];
        if(cmimiriModel[1]==undefined || cmimiriModel[2]==undefined){
          element.promocioni="";
          element.cmimiPromoLek="";
          element.cmimiPromoEur="";
        }else{
          //var replaced = str.split(' ').join('+');
          element.promocioni=cmimiriModel[1];
          element.cmimiPromoLek=cmimiriModel[2];
          element.cmimiPromoEur=cmimiriModel[3];
          }
          element.promocioni=element.promocioni.split(' ').join('\n');



       });

       // $scope.syzeD.forEach( function(element, index) {
       //   $scope.pershkrimiSakte=element.pershkrimartikulli.split(' ');
       //   if ($scope.pershkrimiSakte[0]=="Emporio" || $scope.pershkrimiSakte[0]=="Ray" || $scope.pershkrimiSakte[0]=="RAY" || $scope.pershkrimiSakte[0]=="EMPORIO") {
       //    $scope.pershkrimiSakte.length=3;
       //   }else if($scope.pershkrimiSakte[0]=="DOLCE" || $scope.pershkrimiSakte[0]=="Dolce"){
       //    $scope.pershkrimiSakte.length=4;
       //   }else{
       //    // $scope.pershkrimiSakte=$scope.pershkrimiSakte.splice(-0,3);
       //    $scope.pershkrimiSakte.length=2;
       //   }
       //   element.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');

       // });


       // if ($scope.filterNotActivated==false) {
       //  console.log('eshte aktivizuar');
       //  $scope.filtroProduktet();
       // }else{
       //  console.log('nuk eshte aktivizuar');
       // }

       if($scope.countForBackUp==1){
        $scope.syzeDOriginalBackup=$scope.syzeD;
        console.log("First and only call");
       }
       



       $scope.$broadcast('scroll.infiniteScrollComplete');
       // localStorage.setItem('treArray', JSON.stringify($scope.treArray));
       // console.log($scope.treArray);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);
     }
     });

     console.log("fs");
  // $scope.fshihCmimeVar=false;
  console.log($scope.fshihCmimeVar);

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  

})

.controller('syzeOptikeCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http, $timeout) {
  console.log("test");
  console.log($scope.offsetD);

$scope.moreDataCanBeLoaded=true;


  $scope.active = 'lek';
  $scope.shfaqLek=true;

  $scope.setActive = function(type) {
    $scope.active = type;
    if(type=='lek'){
      $scope.shfaqLek=true;
    }else{
      $scope.shfaqLek=false;
    }
  };

  $scope.isActive = function(type){
    return type === $scope.active;
  };

$scope.itemchecked=false;
$scope.filterNotActivated=true;
$scope.data.gjinia=[];
$scope.skaRezultat=false;

$scope.shfaqFiltraTag=false;
var defaultMinPrice=0;
var defaultMaxPrice=100;

$scope.slider = {
  minValue: defaultMinPrice,
  maxValue: defaultMaxPrice,
  options: {
    floor: defaultMinPrice,
    ceil: defaultMaxPrice,
    translate: function(value, sliderId, label) {
      switch (label) {
        case 'model':
          return '<b>Cmimi Min:</b> '+value+' LEK';
        case 'high':
          return '<b>Cmimi Max:</b> '+value+' LEK';
        default:
          return value + ' LEK'
      }
    }
  }
};


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/getCmimiFilter',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
     }).success(function(response) {
        //console.log(response.rows);

        response.rows.forEach( function(element, index) {
          console.log(element);
          if (element.id==1) {
             $scope.slider.options.floor=element.cmimimin;
             $scope.slider.options.ceil=element.cmimimax;
             $scope.slider.minValue=element.cmimimin;
             $scope.slider.maxValue=element.cmimimax;
             $scope.cmimiMinF=element.cmimimin;
             $scope.cmimiMaxF=element.cmimimax;
            }
        });


          
      });



$scope.shfaqF= function(){
  $scope.data.shfaq=true;
}

$scope.shfaqF2= function(){
  $scope.data.shfaq=false;
}

$scope.shfaqCmimiRender= function(){
  $timeout(function () { 
    $scope.$broadcast('rzSliderForceRender');
    console.log('koha') 
  });
}

  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    Rayban: false,
    Police: false,
    Emporio: false
  };

  $scope.checkResults = [];

  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });


  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

$scope.checkModelGjinia = {
    Woman: false,
    Man: false,
    Unisex: false
  };

  $scope.checkResultsGjinia = [];

  $scope.$watchCollection('checkModelGjinia', function () {
    $scope.checkResultsGjinia = [];
    angular.forEach($scope.checkModelGjinia, function (value, key) {
      if (value) {
        $scope.checkResultsGjinia.push(key);
      }
    });
  });



$scope.klasaSfond=['product--optike1','product--optike2','product--optike3','product--optike4','product--optike5','product--optike6'];

$scope.ktheNgjyre= function(index){
  var kodi=index%6;
  // if(kodi==0){
  //   kodi=6;
  // }
  return kodi
}

$scope.filter={};
$scope.filterM={};
$scope.formatZgjedhur=[];
$scope.markatZgjedhur=[];

$scope.printC = function() {
  $scope.formatZgjedhur=[];
    console.log($scope.filter);
        for(i in $scope.filter) {
        console.log($scope.filter[i]);
        if($scope.filter[i] == true) {
            $scope.formatZgjedhur.push(i);
        }
    }
    console.log($scope.formatZgjedhur);
}

$scope.getMarka = function() {
  $scope.markatZgjedhur=[];
    console.log($scope.filterM);
        for(i in $scope.filterM) {
        console.log($scope.filterM[i]);
        if($scope.filterM[i] == true) {
            $scope.markatZgjedhur.push(i);
        }
    }
    console.log($scope.markatZgjedhur);
}





// Chech which filter tag to show and which one not
$scope.checkFilterValues=function(){
  $scope.fshihCmimeVar=false;
  $scope.fshihFormaVar=false;
  $scope.fshihGjiniaVar=false;
  $scope.fshihMarkaVar=false;
  $scope.filterNotActivated=true;



  if ($scope.slider.minValue == $scope.cmimiMinF && $scope.slider.maxValue == $scope.cmimiMaxF) {
    $scope.fshihCmimeVar=true;
  }else{
    $scope.filterNotActivated=false;
  }

  if ($scope.checkResultsGjinia=='') {
    $scope.fshihGjiniaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihGjiniaVar=false;
  }

  if ($scope.formatZgjedhur=='') {
    $scope.fshihFormaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihFormaVar=false;
  }

  if ($scope.markatZgjedhur=='') {
    $scope.fshihMarkaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihMarkaVar=false;
  }


}

$scope.data.gjinia=new Array(' ');

$scope.filtroProduktet =  function(){
  $scope.checkFilterValues();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }

  console.log($scope.syzeO);
  //$scope.syzeOCopy=$scope.syzeOOriginalBackup;
  console.log($scope.syzeOOriginalBackup);
  var newSyzeOHolder1=[];
  var newSyzeOHolder2=[];
  var newSyzeOHolder3=[];
  var newSyzeOHolder4=[];


  // Cmimi Filter
  $scope.syzeOOriginalBackup.forEach( function(element, index) {
    if(element.cmimilek>=$scope.slider.minValue && element.cmimilek<=$scope.slider.maxValue){
      newSyzeOHolder1.push(element);
    }
  });

  // Gjinia Filter
  // Check if any value is selected from Gjinia
  if ($scope.checkResultsGjinia!='') {
    
    // First loop through the array of all the products
    newSyzeOHolder1.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.checkResultsGjinia.forEach( function(elementt, indexx) {
        if(element.vitprodhimi==elementt){
        newSyzeOHolder2.push(element);
      }
      });
      
    });
  }else{
    newSyzeOHolder2=newSyzeOHolder1;
  }

  // Forma Filter
  // Check if any value is selected from Forma
  if ($scope.formatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeOHolder2.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.formatZgjedhur.forEach( function(elementt, indexx) {
        if(element.zonakadastrale==elementt){
        newSyzeOHolder3.push(element);
      }
      });
      
    });
  }else{
    newSyzeOHolder3=newSyzeOHolder2;
  }


  // Marka Filter
  // Check if any value is selected from Forma
  if ($scope.markatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeOHolder3.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.markatZgjedhur.forEach( function(elementt, indexx) {
        if(element.kodifikimartikulli2==elementt){
        newSyzeOHolder4.push(element);
      }
      });
      
    });
  }else{
    newSyzeOHolder4=newSyzeOHolder3;
  }
  console.log(newSyzeOHolder4);


  $scope.shfaqFiltraTag=true;
  // if filter don't return any result then don't change a thing
  if(newSyzeOHolder4==''){
    $scope.skaRezultat=true;

    $timeout(function () { 
      $scope.skaRezultat = false; 
    }, 3000);

    console.log("bosh 2");
    $scope.data.shfaq=false;
  }else {
      // Set the old array to the new modified one
      $scope.syzeO=newSyzeOHolder4;
      console.log($scope.syzeO);
      $scope.data.shfaq=false;

  }



}



// Delete the Cmimi filters
$scope.fshiCmimiFilter =function(){
  //console.log($scope.slider);
  $scope.slider.minValue= $scope.cmimiMinF;
  $scope.slider.maxValue= $scope.cmimiMaxF;
  $scope.fshihCmimeVar=true;
  // TODO: Call filtroProduktet and filter them again
  $scope.filtroProduktet();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the Gjinia filters
$scope.fshiGjinia2Filter =function(){
  for (var key in $scope.checkModelGjinia) {
  if ($scope.checkModelGjinia.hasOwnProperty(key)) {
    $scope.checkResultsGjinia.forEach( function(element, index) {
      if (key==element) {
        $scope.checkModelGjinia[key]=false;
      }
    });
  }
}

  $scope.checkResultsGjinia=[];
  $scope.filtroProduktet();
  $scope.fshihGjiniaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}

// Delete the Forma filters
$scope.fshiFormaFilter =function(){
  for (var key in $scope.filter) {
  if ($scope.filter.hasOwnProperty(key)) {
    $scope.formatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filter[key]=false;
      }
    });
  }
}

  $scope.formatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihFormaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the marka filters
$scope.fshiMarkaFilter =function(){
  for (var key in $scope.filterM) {
  if ($scope.filterM.hasOwnProperty(key)) {
    $scope.markatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filterM[key]=false;
      }
    });
  }
}

  $scope.markatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihMarkaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}





$scope.remove_duplicates= function(origArr) {
      var newArr = [],
          origLen = origArr.length,
          found, x, y;

      for (x = 0; x < origLen; x++) {
          found = undefined;
          for (y = 0; y < newArr.length; y++) {
              if (origArr[x] === newArr[y]) {
                  found = true;
                  break;
              }
          }
          if (!found) {
              newArr.push(origArr[x]);
          }
      }
      return newArr;
  }

$scope.cleanArray= function(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }





      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeO   = [];
  $scope.markaSyzesh = [];
  $scope.formaSyzesh = [];
  $scope.countForBackUp   = 1;
  $scope.loadNextProducts = function(){
      // $scope.fshihCmimeVar=false;
      // $scope.fshihFormaVar=false;
      // $scope.fshihGjiniaVar=false;
      // $scope.fshihMarkaVar=false;

    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/syze-optike',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);

      if (response.length==0) {
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreDataCanBeLoaded=false;

        var alertPopup = $ionicPopup.alert({
          title: 'Syze Optike',
          template: '<p align="center">Nuk ka syze optike per tu shfaqur!</p>'
        });
        //alert('Nuk ka aksesore per tu shfaqur');
      }else{

       $scope.$broadcast('scroll.infiniteScrollComplete');

       response.forEach(function(item){
        $scope.syzeO.push(item);
        $scope.markaSyzesh.push(item.kodifikimartikulli2);
        $scope.formaSyzesh.push(item.zonakadastrale);

        

      });
       $scope.markaSyzesh = $scope.remove_duplicates($scope.markaSyzesh);
       $scope.formaSyzesh = $scope.remove_duplicates($scope.formaSyzesh);
       $scope.formaSyzesh = $scope.cleanArray($scope.formaSyzesh);
       // console.log($scope.markaSyzesh);
       // console.log($scope.formaSyzesh);


       $scope.syzeO.forEach( function(element, index) {
        element.pershkrimiangartikulliNew=element.pershkrimiangartikulli.slice(3);
       });


       // if ($scope.filterNotActivated==false) {
       //  console.log('eshte aktivizuar');
       //  $scope.filtroProduktet();
       // }else{
       //  console.log('nuk eshte aktivizuar');
       // }

       if($scope.countForBackUp==1){
        $scope.syzeOOriginalBackup=$scope.syzeO;
        console.log("First and only call");
       }
       


      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);
     }
     });

     console.log("fs");
  // $scope.fshihCmimeVar=false;
  console.log($scope.fshihCmimeVar);

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  

})

// Aksesore controller
.controller('koleksioniRiCtrl', function($scope, Syze, $location, $sce, $state, $ionicLoading, $ionicPopup, $http, $timeout, $rootScope, $ionicScrollDelegate) {
  console.log("test");
  console.log($scope.offsetD);

  $scope.$watch('$viewContentLoaded', function(){
    //do something
    console.log('do thirrem ne fund fare');
});

  $scope.moreDataCanBeLoaded=true;
  // $scope.shfaqPoshte=true;

  // $scope.callPoshte=function(){
  //   console.log('called poshte');
  //   $timeout(function () { 
  //       $scope.shfaqPoshte = !$scope.shfaqPoshte; 
  //       $scope.shfaqq=$scope.shfaqPoshte;
  //       $scope.callPoshte();
  //       console.log($scope.shfaqPoshte);
  //   }, 15000);
  // }




  // $scope.callPoshte();

  // $scope.checkScroll = function () {
  //       var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
  //       var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

  //       if (currentTop >= maxTop)
  //       {
  //           // hit the bottom
  //         $scope.shfaqPoshte=false;
  //       }else{
  //         $scope.shfaqPoshte=true;
  //       }
  //   };


  $scope.active = 'lek';
  $scope.shfaqLek=true;

  $scope.setActive = function(type) {
    $scope.active = type;
    if(type=='lek'){
      $scope.shfaqLek=true;
    }else{
      $scope.shfaqLek=false;
    }
  };

  $scope.isActive = function(type){
    return type === $scope.active;
  };


$scope.checkPromotion=function(promo){
  console.log(promo);
  console.log('blag');

  if (promo==undefined || promo =='') {
    // Do nothing
    return false;
  }else {
    return true;
  }

}




   


$scope.itemchecked=false;
$scope.filterNotActivated=true;
$scope.data.gjinia=[];
$scope.skaRezultat=false;



$scope.shfaqFiltraTag=false;
var defaultMinPrice=0;
var defaultMaxPrice=100;

$scope.slider = {
  minValue: defaultMinPrice,
  maxValue: defaultMaxPrice,
  options: {
    floor: defaultMinPrice,
    ceil: defaultMaxPrice,
    translate: function(value, sliderId, label) {
      switch (label) {
        case 'model':
          return '<b>Cmimi Min:</b> '+value+' LEK';
        case 'high':
          return '<b>Cmimi Max:</b> '+value+' LEK';
        default:
          return value + ' LEK'
      }
    }
  }
};


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/getCmimiFilter',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
     }).success(function(response) {
        //console.log(response.rows);

        response.rows.forEach( function(element, index) {
          console.log(element);
          if (element.id==1) {
             $scope.slider.options.floor=element.cmimimin;
             $scope.slider.options.ceil=element.cmimimax;
             $scope.slider.minValue=element.cmimimin;
             $scope.slider.maxValue=element.cmimimax;
             $scope.cmimiMinF=element.cmimimin;
             $scope.cmimiMaxF=element.cmimimax;
            }
        });


          
      });



$scope.shfaqF= function(){
  $scope.data.shfaq=true;
  // $timeout(function () { 
  //   $scope.$broadcast('rzSliderForceRender');
  //   console.log('koha') 
  // });
}

$scope.shfaqF2= function(){
  $scope.data.shfaq=false;
}

$scope.shfaqCmimiRender= function(){
  $timeout(function () { 
    $scope.$broadcast('rzSliderForceRender');
    console.log('koha') 
  });
}




  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    Rayban: false,
    Police: false,
    Emporio: false
  };

  $scope.checkResults = [];




  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });


  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModelGjinia = {
    Woman: false,
    Man: false,
    Unisex: false
  };

  $scope.checkResultsGjinia = [];

  $scope.$watchCollection('checkModelGjinia', function () {
    $scope.checkResultsGjinia = [];
    angular.forEach($scope.checkModelGjinia, function (value, key) {
      if (value) {
        $scope.checkResultsGjinia.push(key);
      }
    });
  });



$scope.klasaSfond=['product--blue','product--orange','product--red','product--green','product--yellow','product--pink'];

$scope.ktheNgjyre= function(index){
  var kodi=index%6;
  if(kodi==0){
    kodi=6;
  }
  return kodi
}

$scope.filter={};
$scope.filterM={};
$scope.formatZgjedhur=[];
$scope.markatZgjedhur=[];

$scope.printC = function() {
  $scope.formatZgjedhur=[];
    console.log($scope.filter);
        for(i in $scope.filter) {
        console.log($scope.filter[i]);
        if($scope.filter[i] == true) {
            $scope.formatZgjedhur.push(i);
        }
    }
    console.log($scope.formatZgjedhur);
}

$scope.getMarka = function() {
  $scope.markatZgjedhur=[];
    console.log($scope.filterM);
        for(i in $scope.filterM) {
        console.log($scope.filterM[i]);
        if($scope.filterM[i] == true) {
            $scope.markatZgjedhur.push(i);
        }
    }
    console.log($scope.markatZgjedhur);
}





// Chech which filter tag to show and which one not
$scope.checkFilterValues=function(){
  $scope.fshihCmimeVar=false;
  $scope.fshihFormaVar=false;
  $scope.fshihGjiniaVar=false;
  $scope.fshihMarkaVar=false;
  $scope.filterNotActivated=true;



  if ($scope.slider.minValue == $scope.cmimiMinF && $scope.slider.maxValue == $scope.cmimiMaxF) {
    $scope.fshihCmimeVar=true;
  }else{
    $scope.filterNotActivated=false;
  }

  if ($scope.checkResultsGjinia=='') {
    $scope.fshihGjiniaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihGjiniaVar=false;
  }

  if ($scope.formatZgjedhur=='') {
    $scope.fshihFormaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihFormaVar=false;
  }

  if ($scope.markatZgjedhur=='') {
    $scope.fshihMarkaVar=true;
  }else{
    $scope.filterNotActivated=false;
    $scope.fshihMarkaVar=false;
  }


}

$scope.data.gjinia=new Array(' ');

$scope.filtroProduktet =  function(){

  $scope.moreDataCanBeLoaded=false;
  $scope.checkFilterValues();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
  console.log($scope.syzeD);
  //$scope.syzeDCopy=$scope.syzeDOriginalBackup;
  console.log($scope.syzeDOriginalBackup);
  var newSyzeDHolder1=[];
  var newSyzeDHolder2=[];
  var newSyzeDHolder3=[];
  var newSyzeDHolder4=[];

  // Cmimi Filter
  $scope.syzeDOriginalBackup.forEach( function(element, index) {
    if(element.cmimilek>=$scope.slider.minValue && element.cmimilek<=$scope.slider.maxValue){
      newSyzeDHolder1.push(element);
    }
  });
  console.log(newSyzeDHolder1);

  // Gjinia Filter
  // Check if any value is selected from Gjinia
  if ($scope.checkResultsGjinia!='') {
    
    // First loop through the array of all the products
    newSyzeDHolder1.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.checkResultsGjinia.forEach( function(elementt, indexx) {
        if(element.vitprodhimi==elementt){
        newSyzeDHolder2.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder2=newSyzeDHolder1;
  }
  console.log(newSyzeDHolder2);

  // Forma Filter
  // Check if any value is selected from Forma
  if ($scope.formatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeDHolder2.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.formatZgjedhur.forEach( function(elementt, indexx) {
        if(element.zonakadastrale==elementt){
        newSyzeDHolder3.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder3=newSyzeDHolder2;
  }
  console.log(newSyzeDHolder3);


  // Marka Filter
  // Check if any value is selected from Forma
  if ($scope.markatZgjedhur!='') {
    // First loop through the array of all the products
    newSyzeDHolder3.forEach( function(element, index) {
      // Then loop through all the selected Forma values and check them all with the products values
      $scope.markatZgjedhur.forEach( function(elementt, indexx) {
        if(element.kodifikimartikulli2==elementt){
        newSyzeDHolder4.push(element);
      }
      });
      
    });
  }else{
    newSyzeDHolder4=newSyzeDHolder3;
  }
  console.log(newSyzeDHolder4);
  



  // // Gjinia Filter
  // if($scope.data.gjinia.length>0){
  //   //console.log('brenda gjinia');
  //   newSyzeDHolder2.forEach( function(element, index) {
  //     if(element.vitprodhimi==$scope.data.gjinia){
  //       newSyzeDHolder3.push(element);
  //     }
  //   });

  // }else{
  //   //console.log('jo brenda gjinia');
  //   newSyzeDHolder3=newSyzeDHolder2;
  // }

  // Marka Filter
  // Check if any value is selected from Forma
  // if ($scope.checkResults!='') {
  //   // Replace Emporio with Emporio Armani in the result array
  //   $scope.checkResults.forEach( function(element, index) {
  //     if(element=='Emporio'){
  //       $scope.checkResults[index]='Emporio Armani';
  //     }
  //   });

  //   // First loop through the array of all the products
  //   newSyzeDHolder3.forEach( function(element, index) {
  //     // Then loop through all the selected Forma values and check them all with the products values
  //     $scope.checkResults.forEach( function(elementt, indexx) {
  //       if(element.kodifikimartikulli2==elementt){
  //       newSyzeDHolder4.push(element);
  //     }
  //     });
      
  //   });
  // }else{
  //   newSyzeDHolder4=newSyzeDHolder3;
  // }

  $scope.shfaqFiltraTag=true;
  // if filter don't return any result then don't change a thing
  if(newSyzeDHolder4==''){
    $scope.skaRezultat=true;

    $timeout(function () { 
      $scope.skaRezultat = false; 
    }, 3000);

    console.log("bosh 2");
    $scope.data.shfaq=false;
  }else {
      // Set the old array to the new modified one
      $scope.syzeD=newSyzeDHolder4;
      console.log($scope.syzeD);
      $scope.data.shfaq=false;

  }








}



// Delete the Cmimi filters
$scope.fshiCmimiFilter =function(){
  //console.log($scope.slider);
  $scope.slider.minValue= $scope.cmimiMinF;
  $scope.slider.maxValue= $scope.cmimiMaxF;
  $scope.fshihCmimeVar=true;
  // TODO: Call filtroProduktet and filter them again
  $scope.filtroProduktet();
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the Gjinia filters
$scope.fshiGjinia2Filter =function(){
  for (var key in $scope.checkModelGjinia) {
  if ($scope.checkModelGjinia.hasOwnProperty(key)) {
    $scope.checkResultsGjinia.forEach( function(element, index) {
      if (key==element) {
        $scope.checkModelGjinia[key]=false;
      }
    });
  }
}

  $scope.checkResultsGjinia=[];
  $scope.filtroProduktet();
  $scope.fshihGjiniaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}

// Delete the Forma filters
$scope.fshiFormaFilter =function(){
  for (var key in $scope.filter) {
  if ($scope.filter.hasOwnProperty(key)) {
    $scope.formatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filter[key]=false;
      }
    });
  }
}

  $scope.formatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihFormaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}


// Delete the marka filters
$scope.fshiMarkaFilter =function(){
  for (var key in $scope.filterM) {
  if ($scope.filterM.hasOwnProperty(key)) {
    $scope.markatZgjedhur.forEach( function(element, index) {
      if (key==element) {
        $scope.filterM[key]=false;
      }
    });
  }
}

  $scope.markatZgjedhur=[];
  $scope.filtroProduktet();
  $scope.fshihMarkaVar=true;
  if ($scope.filterNotActivated==true) {
    $scope.moreDataCanBeLoaded=true;
  }else{
    $scope.moreDataCanBeLoaded=false;
  }
}





$scope.remove_duplicates= function(origArr) {
      var newArr = [],
          origLen = origArr.length,
          found, x, y;

      for (x = 0; x < origLen; x++) {
          found = undefined;
          for (y = 0; y < newArr.length; y++) {
              if (origArr[x] === newArr[y]) {
                  found = true;
                  break;
              }
          }
          if (!found) {
              newArr.push(origArr[x]);
          }
      }
      return newArr;
  }

$scope.cleanArray= function(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }











      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeD   = [];
  $scope.markaSyzesh = [];
  $scope.formaSyzesh = [];
  $scope.countForBackUp   = 1;
  $scope.loadNextProducts = function(){
      // $scope.fshihCmimeVar=false;
      // $scope.fshihFormaVar=false;
      // $scope.fshihGjiniaVar=false;
      // $scope.fshihMarkaVar=false;

    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/syze-koleksion',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);
      if (response.length==0) {
        //$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.moreDataCanBeLoaded=false;

        var alertPopup = $ionicPopup.alert({
          title: 'Aksesore',
          template: '<p align="center">Nuk ka aksesore per tu shfaqur!</p>'
        });
        //alert('Nuk ka aksesore per tu shfaqur');
      }else{
       


       response.forEach(function(item){
        $scope.syzeD.push(item);
        $scope.markaSyzesh.push(item.kodifikimartikulli2);
        $scope.formaSyzesh.push(item.zonakadastrale);

        

      });
       $scope.markaSyzesh = $scope.remove_duplicates($scope.markaSyzesh);
       $scope.formaSyzesh = $scope.remove_duplicates($scope.formaSyzesh);
       $scope.formaSyzesh = $scope.cleanArray($scope.formaSyzesh);
       // console.log($scope.markaSyzesh);
       // console.log($scope.formaSyzesh);

        $scope.syzeD.forEach( function(element, index) {
        element.pershkrimiangartikulliNew=element.pershkrimiangartikulli.slice(3);
       });

       // $scope.syzeD.forEach( function(element, index) {
       //   $scope.pershkrimiSakte=element.pershkrimartikulli.split(' ');
       //   if ($scope.pershkrimiSakte[0]=="Emporio" || $scope.pershkrimiSakte[0]=="Ray" || $scope.pershkrimiSakte[0]=="RAY" || $scope.pershkrimiSakte[0]=="EMPORIO") {
       //    $scope.pershkrimiSakte.length=3;
       //   }else if($scope.pershkrimiSakte[0]=="DOLCE" || $scope.pershkrimiSakte[0]=="Dolce"){
       //    $scope.pershkrimiSakte.length=4;
       //   }else{
       //    // $scope.pershkrimiSakte=$scope.pershkrimiSakte.splice(-0,3);
       //    $scope.pershkrimiSakte.length=2;
       //   }
       //   element.pershkrimartikulli=$scope.pershkrimiSakte.join(' ');

       // });


       // if ($scope.filterNotActivated==false) {
       //  console.log('eshte aktivizuar');
       //  $scope.filtroProduktet();
       // }else{
       //  console.log('nuk eshte aktivizuar');
       // }

       if($scope.countForBackUp==1){
        $scope.syzeDOriginalBackup=$scope.syzeD;
        console.log("First and only call");
       }
       



       $scope.$broadcast('scroll.infiniteScrollComplete');
       // localStorage.setItem('treArray', JSON.stringify($scope.treArray));
       // console.log($scope.treArray);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);

         }
     });

     console.log("fs");
  // $scope.fshihCmimeVar=false;
  console.log($scope.fshihCmimeVar);



  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  

})

.controller('lenteCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http, $stateParams) {
      
      $scope.lenteMarke=$stateParams.lenteMarke;
      console.log($scope.lenteMarke);

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetL = 0;
  $scope.syzeL   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://max-optika-server.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/syze-lente',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetL,
         markaa: $stateParams.lenteMarke,
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syzeL.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offsetL += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

//firt login controller. switchted to ionicPopup login.....see menuCtrl login
.controller('loginCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $timeout, $ionicLoading) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  if (window.localStorage.token && window.localStorage.token !== undefined) {
    console.log('User already logged in 2');
    // $state.go('app.kreu');
  } else {
    $scope.data = {};
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Ju lutemi plotesoni te gjitha te dhenat!</p>'
      });
    };

    $scope.showAlertPass = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Passwordi juaj eshte gabim!</p>'
      });
    };

    $scope.showAlertNotRegistered = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Perdoruesi nuk eshte i regjistruar ose emaili dhe fjalekalimi jane vendosur gabim</p>'
      });
    };
    $scope.showAlertLoginSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Success',
        template: '<p align="center">Logini perfundoi me sukses</p>'
      });
    };


    $scope.prepareStr = function(str) {
      return str.substring(0, 3).split("").reverse().join("").toUpperCase();
    };

    $scope.login = function() {
      $scope.data.email=$scope.data.email.toLowerCase();
      if ($scope.data.email === "" || $scope.data.fjalekalimi === "" ||
        $scope.data.email === undefined || $scope.data.fjalekalimi === undefined) {
        $scope.showAlert();
        console.log('jam');
      } else {
        $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        console.log('nuk jam');
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        // var d = new Date();
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/login-real',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            email: $scope.data.email,
            fjalekalimi: $scope.data.fjalekalimi
          }
        }).success(function(response) {
          $ionicLoading.hide();
          $scope.responseLoggedIn = response[0];
          console.log(response);

          if ($scope.responseLoggedIn.login==1) {
            console.log('sukses');
            $scope.loggedin = true;


            
            // window.location = "#/app/kreu";

            $scope.responseLoggedIn=JSON.stringify($scope.responseLoggedIn);
            window.localStorage.setItem('loggedInSakte', $scope.responseLoggedIn);

            window.localStorage.setItem('loggedInSakte2', $scope.loggedin);

            $scope.showAlertLoginSuccess();

            $timeout(function() {
                window.location = "#/app/kreu";
              }, 400);  



          }else if ($scope.responseLoggedIn.login==0) {
            console.log('jo sukses');
            $scope.showAlertNotRegistered();
            // $scope.showAlertEmailEkziston();
          }else{
            console.log('gabim tjeter');
          }          
          // console.log($scope.response.login);
          // if ($scope.response.login === 1) {
          //   console.log('Logged in...');
          //   $scope.loggedin = true;
          //   console.log($scope.response.id);
          //   window.localStorage.setItem('id', $scope.response.id);
          //   $state.go('app.kreu', {}, {
          //     reload: true
          //   });
          // } else if ($scope.response.login === 0) {
          //   $scope.showAlertPass();
          // } else {
          //   $scope.showAlertNotRegistered();
          // }
        });
      }
    };
  }

  $scope.fbLogin = function() {
    ngFB.login({
      scope: 'email,publish_actions,public_profile,user_about_me'
    }).then(
      function(response) {
        var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        var d = new Date();
        var token = base64Str + d.getTime();
        if (response.status === 'connected') {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('fbl', true);
          $scope.loggedin = true;
          console.log('Facebook login succeeded');
          $state.go('app.kreu', {}, {
            reload: true,
            cache: false
          });
        } else {
          alert('Facebook login failed');
        }
      });
  };
})

.controller('forgotPasswordCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $timeout, $ionicLoading) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }



    $scope.dataF = {};
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Ju lutemi plotesoni te dhenat!</p>'
      });
    };

    $scope.showAlertEmail = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi deshtoi',
        template: '<p align="center">Ju lutemi vendosni nje email te vlefshem</p>'
      });
    };

    $scope.showAlertNotEmail = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi deshtoi',
        template: '<p align="center">Llogaria me kete email nuk ekziston</p>'
      });
    };
    $scope.showAlertForgotPasswordSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi perfundoi me sukses',
        template: '<p align="center">Ju lutemi kontrolloni emailin tuaj per fjalekalimin!</p>'
      });
    };


    $scope.prepareStr = function(str) {
      return str.substring(0, 3).split("").reverse().join("").toUpperCase();
    };

    $scope.validateEmail= function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

    $scope.forgotPassword = function() {
      var sakteEmail=$scope.validateEmail($scope.dataF.email);
      if ($scope.dataF.email === "" || $scope.dataF.email === undefined ) {
        $scope.showAlert();
        console.log('jam forgot password');
      } else if(!sakteEmail){
        $scope.showAlertEmail();
      } else {
        $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        console.log('nuk jam forgot password');
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        // var d = new Date();
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/forgot-password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            email: $scope.dataF.email
          }
        }).success(function(response) {
          $ionicLoading.hide();
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          if (response.forgot==1) {
           $scope.showAlertForgotPasswordSuccess();

          }else if (response.forgot==0) {
            $scope.showAlertNotEmail();

          }       

        });
      }
    };



})


.controller('regjistrohuCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $ionicLoading) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


      if (window.localStorage.token && window.localStorage.token !== undefined) {
        console.log('User already logged in');
        // $state.go('app.kreu');
        alert('User already logged in register');
      } else {
        $scope.dataR = {};
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Ju lutemi plotesoni te gjitha te dhenat!</p>'
          });
        };

        $scope.showAlertPassShkurter = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Passwordi juaj eshte shume i shkurter! (Min: 6 karaktere)</p>'
          });
        };
        $scope.showAlertPassDontMatch = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Fjalekalimi dhe konfirmimi i fjalekalimit nuk jane te njejte</p>'
          });
        };
        $scope.showAlertEmail = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ju lutem vendosni nje email te sakte!</p>'
          });
        };

        $scope.showAlertNotRegistered = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Perdoruesi nuk eshte i regjistruar!</p>'
          });
        };
        $scope.showAlertRegjistrimSukses = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Perfundoi',
            template: '<p align="center">Regjistrimi Perfundoi Me Sukses, Ju Lutem beni login</p>'
          });
        };
        $scope.showAlertEmailEkziston = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ky email ekziston njehere! Ju lutem perdorni nje tjeter.</p>'
          });
        };

        $scope.prepareStr = function(str) {
          return str.substring(0, 3).split("").reverse().join("").toUpperCase();
        };

       $scope.validateEmail= function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      $scope.regjistrohu = function() {
        var sakteEmail=$scope.validateEmail($scope.dataR.email);
        sakteEmail=sakteEmail.toLowerCase();

      if ($scope.dataR.emer === "" || $scope.dataR.mbiemer === "" ||
        $scope.dataR.emer === undefined || $scope.dataR.mbiemer === undefined || 
        $scope.dataR.tel === "" || $scope.dataR.tel === undefined) {
        $scope.showAlert();
      }else if(!sakteEmail){
        console.log("Invalid Email");
        $scope.showAlertEmail();

      }else if($scope.dataR.fjalekalimi === "" || $scope.dataR.fjalekalimi === undefined){
        console.log("Password too short");
        $scope.showAlertPassShkurter();

      }else if($scope.dataR.fjalekalimi!= $scope.dataR.fjalekalimiKonfirmuar){
        console.log("Password don't match");
        $scope.showAlertPassDontMatch();

      }else {
        console.log($scope.dataR);
          // Setup the loader
          $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(d);
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/register',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            emer: $scope.dataR.emer,
            mbiemer: $scope.dataR.mbiemer,
            tel: $scope.dataR.tel,
            email: $scope.dataR.email,
            fjalekalimi: $scope.dataR.fjalekalimi,
            date: d
          }
        }).success(function(response) {
          $ionicLoading.hide();
          console.log('Pergjigja ');
          console.log(response);
          // var pergjigje=JSON.parse(response);
          if (response.regjistrimi==1) {
            console.log('sukses');
            $scope.showAlertRegjistrimSukses();
            window.location = "#/app/login";
          }else if (response.regjistrimi==0) {
            console.log('jo sukses');
            $scope.showAlertEmailEkziston();
          }else{
            console.log('gabim tjeter');
          }
        });
      }
    }
  }



})



.controller('modifikoProfilinCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $ionicLoading) {

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


      if (window.localStorage.token && window.localStorage.token !== undefined) {
        console.log('User already logged in');
        // $state.go('app.kreu');
        alert('User already logged in register');
      } else {
        $scope.dataR = $scope.loggedInSakte;
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Ju lutemi plotesoni te gjitha te dhenat!</p>'
          });
        };

        $scope.showAlertPassShkurter = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Passwordi juaj eshte shume i shkurter! (Min: 6 karaktere)</p>'
          });
        };
        $scope.showAlertPassDontMatch = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Fjalekalimi dhe konfirmimi i fjalekalimit nuk jane te njejte</p>'
          });
        };
        $scope.showAlertEmail = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ju lutem vendosni nje email te sakte!</p>'
          });
        };

        $scope.showAlertNotRegistered = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Perdoruesi nuk eshte i regjistruar!</p>'
          });
        };
        $scope.showAlertRegjistrimSukses = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Perfundoi',
            template: '<p align="center">Te dhenat u modifikuan me sukses.</p>'
          });
        };
        $scope.showAlertEmailEkziston = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ky email ekziston njehere! Ju lutem perdorni nje tjeter.</p>'
          });
        };

        $scope.prepareStr = function(str) {
          return str.substring(0, 3).split("").reverse().join("").toUpperCase();
        };

       $scope.validateEmail= function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      $scope.modifiko = function() {
        var sakteEmail=$scope.validateEmail($scope.dataR.email);
        //console.log($scope.dataR);

      if ($scope.dataR.emer === "" || $scope.dataR.mbiemer === "" ||
        $scope.dataR.emer === undefined || $scope.dataR.mbiemer === undefined || 
        $scope.dataR.celular === "" || $scope.dataR.celular === undefined) {
        $scope.showAlert();
      }else {
        console.log($scope.dataR);
          // Setup the loader
          $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });

        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/modifiko',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            emer: $scope.dataR.emer,
            mbiemer: $scope.dataR.mbiemer,
            tel: $scope.dataR.celular,
            email: $scope.dataR.email
          }
        }).success(function(response) {
          $ionicLoading.hide();
          console.log('Pergjigja ');
          console.log(response);
          // var pergjigje=JSON.parse(response);
          if (response.regjistrimi==1) {
            console.log('sukses');
            $scope.showAlertRegjistrimSukses();
            window.location = "#/app/login";
          }else if (response.regjistrimi==0) {
            console.log('jo sukses');
            $scope.showAlertEmailEkziston();
          }else{
            console.log('gabim tjeter');
          }
        });
      }
    }
  }



})

//geolocation api
/*.controller('geoCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, long);
      var destLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var bounds = new google.maps.LatLngBounds;
      var markersArray = [];

      var origin1 = {
        lat: lat,
        lng: long
      };

      var destination = [{
        lat: 41.3233877,
        lng: 19.8042855
      }, {
        lat: 41.312632,
        lng: 19.445885
      }, {
        lat: 41.3201939,
        lng: 19.8225954
      }, {
        lat: 41.3378682,
        lng: 19.823598
      }];
      var geocoder = new google.maps.Geocoder;
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Pozicioni juaj!"
      });
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [origin1],
        destinations: destination,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var outputDiv = document.getElementById('output');
          outputDiv.innerHTML = '';
          deleteMarkers(markersArray);

          var showGeocodedAddressOnMap = function(asDestination) {
            // var icon = asDestination ? destinationIcon : originIcon;
            return function(results, status) {
              if (status === 'OK') {
                map.fitBounds(bounds.extend(results[0].geometry.location));
              } else {
                alert('Geocode was not successful due to: ' + status);
              }
            };
          };

          for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            geocoder.geocode({
              'address': originList[i]
            }, showGeocodedAddressOnMap(false));
            for (var j = 0; j < results.length; j++) {
              geocoder.geocode({
                'address': destinationList[j]
              }, showGeocodedAddressOnMap(true));
              addToJson[j] = results[j].distance.value;
            }
          }

          /* Shortest route */
/*
          var min = addToJson[0];
          var index = 0;
          for (var i = 1; i < addToJson.length; i++) {
            if (min > addToJson[i]) {
              min = addToJson[i];
              index = i;
            }
          }

          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: map,
          });

          directionsDisplay.addListener('directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
          });

          displayRoute(origin1, destination[index], directionsService, directionsDisplay);

          function displayRoute(origin, destination, service, display) {
            service.route({
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING',
              avoidTolls: true
            }, function(response, status) {
              if (status === 'OK') {
                display.setDirections(response);
              } else {
                alert('Could not display directions due to: ' + status);
              }
            });
          }

          function computeTotalDistance(result) {
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
              total += myroute.legs[i].distance.value;
            }
            total = total / 1000;
          }

          //end of shortest route
        }



      });

      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }
      $scope.map = map;
      $ionicLoading.hide();
      console.log(lat);
      console.log(long);
      console.log(addToJson);
    }, function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });
})
*/
.controller('geoCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.adresses = [{
    "Dyqani": "Max Optika QTU",
    "Adresa": "Autostrada Tirane - Durres, Km 6, Kashar 1001, Tirana, Albania",
    "Email": "qtu@maxoptika.al",
    "Cel": '694000607',
    "Orari": "09:00-21:00",
    lat:41.353877,
    long: 19.749451
  }, {
    "Dyqani": "Max Optika Citypark",
    "Adresa": "Qendra Tregetare Citypark, Tirane",
    "Email": "citypark@maxoptika.al",
    "Cel": '694000608',
    "Orari": "10:00-21:00",
    lat:41.368473,
    long: 19.686994
  }, {
    "Dyqani": "Max Optika Myslym Shyri",
    "Adresa": "Rruga Myslym Shyri , pallati 55/1",
    "Email": "m.shyri@maxoptika.al",
    "Cel": '694000613',
    "Orari": "09:00-21:00",
    lat:41.324651,
    long: 19.811193
  }, {
    "Dyqani": "Max Optika 21 Dhjetori",
    "Adresa": "Rruga Muhamet Gjollesha, Tirane",
    "Email": "21dhjetori@maxoptika.al",
    "Cel": '689092405',
    "Orari": "09:00-21:00",
    lat:41.323523,
    long: 19.804970
  }, {
    "Dyqani": "Max Optika Sheshi Wilson",
    "Adresa": "Rruga Sami Frasheri, Njesia Bashkiake nr 5, tek rrethrrotullimi i Sheshit Wilson",
    "Email": "sheshi.wilson@maxoptika.al",
    "Cel": '694045454',
    "Orari": "09:00-21:00",
    lat:41.320154,
    long: 19.823035
  }, {
    "Dyqani": "Max Optika Medrese",
    "Adresa": "Rruga Bajram Curri, pallati nr:312/12 prane Medreses.",
    "Email": "medrese@maxoptika.al",
    "Cel": '694045452',
    "Orari": "09:00-21:00",
    lat:41.337900,
    long: 19.825765
  }, {
    "Dyqani": "Max Optika Durres",
    "Adresa": "Lagjia nr.1 Rruga Tregtare,mbrapa Bashkise,Durres",
    "Email": "durres@maxoptika.al",
    "Cel": '694000609',
    "Orari": "09:00-20:00",
    lat:41.312611,
    long: 19.445931
  }, {
    "Dyqani": "Max Optika Lushnje",
    "Adresa": "Bulevardi kryesor, perballe Bashkise, Lushnje",
    "Email": "lushnje@maxoptika.al",
    "Cel": '694045700',
    "Orari": "09:00-21:00",
    lat:40.939674,
    long: 19.705657
  }, {
    "Dyqani": "Max Optika Vlore",
    "Adresa": "Bulevardi Vlore-Skele, perballe pallatit te sportit, Vlore",
    "Email": "vlore@maxoptika.al",
    "Cel": '696048849',
    "Orari": "09:00-21:00",
    lat:40.464000,
    long: 19.481678
  }, {
    "Dyqani": "Max Optika Fier",
    "Adresa": "Lagjia 11 Janari, Rruga Ramiz Aranitasi, Fier",
    "Email": "fier@maxoptika .al",
    "Cel": '694000614',
    "Orari": "09:00-21:00",
    lat:40.725935,
    long: 19.559687
  }, {
    "Dyqani": "Max Optika Sarande",
    "Adresa": "Rruga Onhezmi, Sarande",
    "Email": "maxoptika.sarande@gmail.com",
    "Cel": '688034749',
    "Orari": "09:00-21:00",
    lat:39.874918,
    long: 20.005693
  }, {
    "Dyqani": "Max Optika Elbasan",
    "Adresa": "Rruga Rinia, Elbasan",
    "Email": "maxoptika.elbasan@gmail.com",
    "Cel": '694057812',
    "Orari": "09:00-21:00",
    lat:41.122471,
    long:  20.078612
  }, {
    "Dyqani": "Max Optika Korce",
    "Adresa": "Lagjja 9, Rruga Midhi Kostani, prane Bankes Kombetare, Korce",
    "Email": "korce@maxoptika.al",
    "Cel": '696098866',
    "Orari": "09:00-20:00",
    lat:40.616302,
    long: 20.776756
  }, {
    "Dyqani": "Max Optika Pogradec",
    "Adresa": "Rruga Refik Collaku,perballe hotel Enkelana, Pogradec",
    "Email": "maxoptika.pogradec@gmail.com",
    "Cel": '694045453',
    "Orari": "09:00-20:00",
    lat:40.900274,
    long: 20.657215
  }, {
    "Dyqani": "Max Optika Kruje",
    "Adresa": "Lagjja Sesere, qender Kruje",
    "Email": "maxoptika.kruje@gmail.com",
    "Cel": '694000611',
    "Orari": "09:00-21:00",
    lat:41.511444,
    long: 19.790840
  }, {
    "Dyqani": "Max Optika Lezhe",
    "Adresa": "Qendra Tregetare Net Center,Lezhe",
    "Email": "lezhe@maxoptika.al",
    "Cel": '689092403',
    "Orari": "09:00-21:00",
    lat:41.778749,
    long: 19.649009
  }, {
    "Dyqani": "Max Optika Shkoder",
    "Adresa": "Lagjja Qemal Stafa, Rruga 13 Dhjetori, Shkoder",
    "Email": "shkoder@maxoptika.al",
    "Cel": '696048850',
    "Orari": "09:00-21:00",
    lat:42.072124,
    long:  19.515109
  }, {
    "Dyqani": "Max Optika Prishtine",
    "Adresa": "Rruga Bulevardi I Deshmoreve, prane Aleances, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.656545,
    long: 21.168937
  }, {
    "Dyqani": "Max Optika Minimax",
    "Adresa": "Qendra tregtare Minimax, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.660741,
    long: 21.141244
  }];
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
    });

    var posOptions = {
      enableHighAccuracy: false,
      timeout: 10000
    };
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

        // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    // var onSuccess = function(position) {
    //     alert('Latitude: '          + position.coords.latitude          + '\n' +
    //           'Longitude: '         + position.coords.longitude         + '\n' +
    //           'Altitude: '          + position.coords.altitude          + '\n' +
    //           'Accuracy: '          + position.coords.accuracy          + '\n' +
    //           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //           'Heading: '           + position.coords.heading           + '\n' +
    //           'Speed: '             + position.coords.speed             + '\n' +
    //           'Timestamp: '         + position.timestamp                + '\n');
    // };

    // // onError Callback receives a PositionError object
    // //
    // function onError(error) {
    //     alert('code: '    + error.code    + '\n' +
    //           'message: ' + error.message + '\n');
    // }

    // $cordovaGeolocation.getCurrentPosition(onSuccess, onError);

    

    // var watchId = navigator.geolocation.watchLocation();
    // //var watchId=$cordovaGeolocation.watchLocation();

    // // if (navigator.geolocation) {
    // //   console.log('geolocation');
    // //   navigator.geolocation.getCurrentPosition(function(position) {
    // //   alert('navigator ok :'+lat+' '+lng);
    // //   var lat = position.coords.latitude;
    // //   var lng = position.coords.longitude;

    // //   }, function(error) {
    // //   alert('code: '    + error.code    + '\n' +
    // //            'message: ' + error.message + '\n');
    // //   });
    // //   } else {
    // //   alert('no geolocation');
    // //   }

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("lat eshte "+lat);
      console.log("long eshte "+long);
      // lat =41.322472;
      // long =19.450777;
      // lat-null;
      // long=null;

      for (var i = 0; i < $scope.adresses.length; i++) {
        var distanca=getDistanceFromLatLonInKm(lat,long,$scope.adresses[i].lat,$scope.adresses[i].long);
        $scope.adresses[i].distanca=distanca;
        
      }
      $scope.adresses.sort(function(a, b) {
          return parseFloat(a.distanca) - parseFloat(b.distanca);
      });
      console.log($scope.adresses);
      $ionicLoading.show({
        template: 'Dyqanet jane renditur sipas distances nga pozicioni juaj!',
        duration: 1500
      });
      // $ionicPopup.alert({
      //       title: 'Rezervo Takim',
      //       template: '<p align="center">Rezervimi u krye me sukses!</p>'
      //     });

      //navigator.geolocation.clearWatch(watchId);
     }, function (error) {
      $ionicLoading.hide();
      if(error.code==1){
        // $ionicPopup.alert({
        //   title: 'Gabim',
        //   template: '<p align="center">Ju lutem aktivizoni location</p>'
        // });
        alert('Ju lutem aktivizoni location');
        //$ionicLoading.hide();
      }else{
        // $ionicPopup.alert({
        //   title: 'Gabim',
        //   template: '<p align="center">Nuk mund te gjendet location per momentin. Ju lutem provojeni me vone.</p>'
        // });
        // $ionicLoading.hide();
        alert('Nuk mund te gjendet location per momentin. Ju lutem provojeni me vone.');
      }
      //$ionicLoading.hide();
      
      // alert('code: '    + error.code    + '\n' +
      //         'message: ' + error.message + '\n');
      //navigator.geolocation.clearWatch(watchId);
    });

    
  });
})

.controller('menuCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $ionicSideMenuDelegate) {

  // Check whether is open the side bar or not and does sth everytime with it 
  $scope.$watch(function () {
    return $ionicSideMenuDelegate.getOpenRatio();
  },
    function (ratio) {
    if (ratio == 1){
     
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }

      }
    });

  
  // console.log($scope.wishlistItems);
  //$scope.loggedin = false;
  console.log('called');
  $scope.data = {};
  if (window.localStorage.token !== "empty" && window.localStorage.token !== undefined) {
    $scope.loggedin = true;
    $scope.username = atob(window.localStorage.username.substr(0, (window.localStorage.username.length - 4)));
    console.log($scope.username);
  }
  $scope.logout = function() {
    console.log('Loogggout');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    console.log('logout nga menu');
    // If user has loged in with facebook then log him/her out
    if (window.localStorage.getItem('fbl')) {
      window.localStorage.removeItem('fbl');
      //$scope.loggedin = true;
      ngFB.logout();
    }
    window.location.reload(true);
  };

  $scope.showData = function() {
    ngFB.api({
      path: '/me',
      params: {
        fields: 'id,name'
      }
    }).then(
      function(user, error) {
        if (error) {
          console.log(error.error_description + " test!");
        } else {
          $scope.user = user;
          $scope.data.img = "http://graph.facebook.com/" + $scope.user.id + "/picture?width=270&height=270";
        }

      });
  };
  $scope.showData();
})

.controller('wishlistCtrl', function($scope, $http, $stateParams, $rootScope, $timeout) {
      // Check the number of elements in the cart and wishlist
      $scope.pojamboshw=false;
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
        $scope.pojamboshw=true;
        $scope.pojambosh2w=false;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        $scope.pojamboshw=true;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
          
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.response = {};

  $scope.removeFromWishlist = function(item) {
    var wsh = window.localStorage.wishlist.split(',');
    var i = wsh.indexOf(item.target.id);
    wsh.splice(i, 1);
    window.localStorage.wishlist = wsh;
    item.target.hidden = true;
    item.target.parentElement.parentElement.parentElement.remove();

    var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        $scope.pojamboshw=true;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

  };

  $scope.getWishlist = function() {
    var data = window.localStorage.getItem('wishlist') || "";
    if ($scope.pojamboshw==false) {
      $scope.pojambosh2w=true;

    }
    // console.log(typeof(data));
    // var varg = [];
    // var res = data.split(",");
    // varg.push(res);
    
    // console.log(res[0]);
    // var wishi = JSON.stringify(data.split(','));
    // console.log(typeof(wishi));
    // for (var i = 0; i<data.length; i ++) {
    //   console.log(data[i]+" "+i);
    // };
    // console.log(wishi);
    // console.log("id :"+data);
    if (data !== "") {
      $http({
        method: 'POST',
        url: 'https://max-optika-server.herokuapp.com/wishlist',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          wishlist: JSON.stringify(data.split(','))
        }
      }).success(function(response) {
        $scope.pojambosh2w=false;
        $scope.response = response;
        


        for (var i in $scope.response) {
          // console.log($scope.response[i].name);
        }
      });
    };
  }
  $scope.getWishlist();

  // $scope.wishbosh=false;
  // $scope.wishbosh2=true;


  // // Hide the scroll and display message if wishlist is empty
  // $timeout(function() {
  // if (!$scope.response.length) {
  //   console.log($scope.response.length+"mnb");
  //   $scope.wishbosh2=false;
  //   $scope.wishbosh=true;


  //   }
  // }, 3000);  

  


  })


.controller('shportaCtrl', function($scope, $http, $stateParams, $rootScope, $timeout, $ionicModal,PaypalService, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');


$scope.getShnamo=function(action,id, where){
  // var action=action;
  //console.log("u thirra kot");
    $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/shnamo',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         action : action,
         idd: id
       }
     }).success(function(response) {
      console.log(response);
      if (response.pergjigje1!='perditesim') {


            var ip = 'http://79.106.161.194:3040';
            var username = "dea";  
            var encrypted='52f47b027746c6a9d000cb866d8b92ab446a67aea3c264cc9ea02a70ce1bbd04';

            var kokaPrefiks='SHNAMO';
            var currId=response.pergjigje1.shnamo;
            var id_dok=kokaPrefiks+response.pergjigje1.shnamo;
            

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            var dataS = mm+'/'+dd+'/'+yyyy;
            //console.log(todayy);
            //var dataS='08/25/2017';
            // var currCmimiTvsh=$scope.syze.cmimilek;
            // var currCmimiPaTvsh=currCmimiTvsh/1.2;
            // currCmimiPaTvsh=currCmimiPaTvsh.toFixed(2);
            // console.log(currCmimiTvsh);
            // console.log(currCmimiPaTvsh);




            var trupiEksport = new Array();
            var kokaEksport = new Array();

            var kokeNew = {
                    'ID_DOKIMPORT':id_dok,
                    'NENKATEGORIA':'USH',
                    'LLOJDOKUMENTI':'USHmag',
                    'NRDOK': id_dok,
                    // 'NDERMARRJEKOD': vlera,
                    'DATEDOK': dataS,
                    'KLIENTFURNITOR': 'KL83',
                    'MENYREPAGESE': 'Pagese',
                    'DTREGJISTRIMI': dataS, 
                    'EMERKLIENTI': 'Test Klienttt',
                    'KONTAKTI': '069121212',
               };

              kokaEksport.push(kokeNew);

              // Trupi eshte nje array me objetet qe do te shiten brenda
              // for (var j = 0; j < trupi.length; j++) {
              //     var trupNew = {
              //         'ID_DOKIMPORTKOKA': '99999999999999999999999999999999999999999', //Këtu duhet vendosur id e kokës së dokumentit.
              //         'LLOJVEPRIMI': 'Artikull',
              //         'KODI': 'SD13137',  //Duhet të vendoset kodi i artikullit. Fushë e detyrueshme.
              //         'NJESIA': 'cope', //Duhet të vendoset njësia matëse e artikullit. Fushë e detyrueshme.
              //         'SASIA': 1,  //Duhet të vendoset sasia e artikullit. Fushë e detyrueshme.
              //         'CMIMI': 23900,  //Nëse përdoren cmime pa TVSH për artikujt, duhet të vendoset cmimi pa tvsh. 
              //         // 'ZBRITJE': vlera,  //Nëse ka zbritje analitike duhet të vendoset përqindja e zbritjes. Fushë jo e detyrueshme.
              //         'VLEFTAPATVSH': 23900,  //Duhet të vendoset vlefta pa tvsh e artkullit. Fushë e detyrueshme.
              //         'VLEFTAMETVSH': 23900,  //Duhet të vendoset vlefta me tvsh e artkullit. Fushë e detyrueshme.
              //         'MAGAZINA ': 'qendra',  //Duhet të vendoset magazina nga po behet veprimi. Fushë e detyrueshme.
              //         'SHENIME': "test nga aplikacioni",
              //         // 'CMIMIMETVSH': vlera  //Nëse përdoren cmime me TVSH duhet të vendoset cmimi i artikullit te kjo fushë, fushë jo e detyrueshme.
            
              //                    };
              //     trupiEksport.push(trupNew);
              // }
                      //console.log($scope.response);
                    for (var j = 0; j < $scope.response.length; j++) {

                      if($scope.response[j].cmimiPromoLek !=""){
                        console.log('jam brenda tek cmimi promo');
                        var currCmimi=$scope.response[j].cmimilek;
                        var currCmimiTvsh=$scope.response[j].cmimiPromoLek;
                        //var zbritja=0;
                        var zbritja=($scope.response[j].cmimilek - $scope.response[j].cmimiPromoLek)/$scope.response[j].cmimilek*100;
                        //console.log(zbritja);
                        zbritja=zbritja.toFixed(2);
                        //console.log(zbritja);

                      }else{
                        var currCmimi=$scope.response[j].cmimilek;
                        var currCmimiTvsh=$scope.response[j].cmimilek;
                        var zbritja=0;
                      }
                      var kodi=$scope.response[j].kodartikulli;

                      //var currCmimiTvsh=$scope.response[j].cmimilek;
                      var currCmimiPaTvsh=currCmimiTvsh/1.2;
                      currCmimiPaTvsh=currCmimiPaTvsh.toFixed(2);
                      var vendi;
                      // console.log(currCmimiTvsh);
                      // console.log(currCmimiPaTvsh);
                      if (where=='Pick Up On Store') {
                        vendi=$scope.dyqanetListaSelected.dyqani;
                      }else{
                        vendi='Pay On Delivery';
                      }



                      var trupNew = {
                      'ID_DOKIMPORTKOKA': id_dok, //Këtu duhet vendosur id e kokës së dokumentit.
                      'LLOJVEPRIMI': 'Artikull',
                      'KODI': kodi,  //Duhet të vendoset kodi i artikullit. Fushë e detyrueshme.
                      'PERSHKRIMI':vendi,         //Vendoset përshkrimi i artikullit. Fushë jo e detyrueshme pasi merret nga artikulli.
                      'NJESIA': 'cope', //Duhet të vendoset njësia matëse e artikullit. Fushë e detyrueshme.
                      'SASIA': 1,  //Duhet të vendoset sasia e artikullit. Fushë e detyrueshme.
                      'CMIMI': currCmimi,  //Nëse përdoren cmime pa TVSH për artikujt, duhet të vendoset cmimi pa tvsh.
                      'LLOJZBRITJE': 'Perqindje', 
                      'ZBRITJE': zbritja,  //Nëse ka zbritje analitike duhet të vendoset përqindja e zbritjes. Fushë jo e detyrueshme.
                      'TVSH': 20,
                      'VLEFTAPATVSH': currCmimiPaTvsh,  //Duhet të vendoset vlefta pa tvsh e artkullit. Fushë e detyrueshme.
                      'VLEFTAMETVSH': currCmimiTvsh,  //Duhet të vendoset vlefta me tvsh e artkullit. Fushë e detyrueshme.
                      'MAGAZINA': 'MX83',  //Duhet të vendoset magazina nga po behet veprimi. Fushë e detyrueshme.
                      'SHENIME': where,
                      // 'CMIMIMETVSH': vlera  //Nëse përdoren cmime me TVSH duhet të vendoset cmimi i artikullit te kjo fushë, fushë jo e detyrueshme.
            
                                 };
                  trupiEksport.push(trupNew);
                }
                console.log(trupiEksport);

          // }

          var dokPerTeDerguar = {kokaEksport: kokaEksport, trupiEksport: trupiEksport};

          var dataToSend = JSON.stringify({
              listEksportuar: dokPerTeDerguar,
              formatPerImport: 'ImportShitjeDEA',
              formatObjekti: "Shitje"
          });
          console.log('testi 1');
          console.log(dataToSend);




          $.ajax({
           beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username +":"+encrypted));
            },
            url: ip + "/importoEksportin",
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            dataType: 'json',
            headers: {
            'ndermarrjaserver': 'MAXOPTIKA',
            'eksportprefixid': 'Shitje'
           },
           success: function (res) {
            $scope.$apply(function () {
                console.log('rezultati erdhiii');
                console.log(res);
                $scope.getShnamo('perditeso',currId+1);
            });

            



           },
            error: function (res) {
            
            //console.log(res);
            $scope.$apply(function () {
               console.log('something went wrong');
                console.log(res);
            });
          }   
        });

         }else{
          console.log('rast perditesimi')
         } 

      });

}

$scope.testApi=function(){
  //console.log('u thirra');


  $scope.getShnamo('merr','bosh', "Pick Up On Store");
  // $scope.getShnamo('perditeso',0);


}










    // Geolocation Script Start

    $scope.gjejVendodhjen=function(){

    $scope.adresses = [{
    "Dyqani": "Max Optika QTU",
    "Adresa": "Autostrada Tirane - Durres, Km 6, Kashar 1001, Tirana, Albania",
    "Email": "qtu@maxoptika.al",
    "Cel": '694000607',
    "Orari": "09:00-21:00",
    lat:41.353877,
    long: 19.749451
  }, {
    "Dyqani": "Max Optika Citypark",
    "Adresa": "Qendra Tregetare Citypark, Tirane",
    "Email": "citypark@maxoptika.al",
    "Cel": '694000608',
    "Orari": "10:00-21:00",
    lat:41.368473,
    long: 19.686994
  }, {
    "Dyqani": "Max Optika Myslym Shyri",
    "Adresa": "Rruga Myslym Shyri , pallati 55/1",
    "Email": "m.shyri@maxoptika.al",
    "Cel": '694000613',
    "Orari": "09:00-21:00",
    lat:41.324651,
    long: 19.811193
  }, {
    "Dyqani": "Max Optika 21 Dhjetori",
    "Adresa": "Rruga Muhamet Gjollesha, Tirane",
    "Email": "21dhjetori@maxoptika.al",
    "Cel": '689092405',
    "Orari": "09:00-21:00",
    lat:41.323523,
    long: 19.804970
  }, {
    "Dyqani": "Max Optika Sheshi Wilson",
    "Adresa": "Rruga Sami Frasheri, Njesia Bashkiake nr 5, tek rrethrrotullimi i Sheshit Wilson",
    "Email": "sheshi.wilson@maxoptika.al",
    "Cel": '694045454',
    "Orari": "09:00-21:00",
    lat:41.320154,
    long: 19.823035
  }, {
    "Dyqani": "Max Optika Medrese",
    "Adresa": "Rruga Bajram Curri, pallati nr:312/12 prane Medreses.",
    "Email": "medrese@maxoptika.al",
    "Cel": '694045452',
    "Orari": "09:00-21:00",
    lat:41.337900,
    long: 19.825765
  }, {
    "Dyqani": "Max Optika Durres",
    "Adresa": "Lagjia nr.1 Rruga Tregtare,mbrapa Bashkise,Durres",
    "Email": "durres@maxoptika.al",
    "Cel": '694000609',
    "Orari": "09:00-20:00",
    lat:41.312611,
    long: 19.445931
  }, {
    "Dyqani": "Max Optika Lushnje",
    "Adresa": "Bulevardi kryesor, perballe Bashkise, Lushnje",
    "Email": "lushnje@maxoptika.al",
    "Cel": '694045700',
    "Orari": "09:00-21:00",
    lat:40.939674,
    long: 19.705657
  }, {
    "Dyqani": "Max Optika Vlore",
    "Adresa": "Bulevardi Vlore-Skele, perballe pallatit te sportit, Vlore",
    "Email": "vlore@maxoptika.al",
    "Cel": '696048849',
    "Orari": "09:00-21:00",
    lat:40.464000,
    long: 19.481678
  }, {
    "Dyqani": "Max Optika Fier",
    "Adresa": "Lagjia 11 Janari, Rruga Ramiz Aranitasi, Fier",
    "Email": "fier@maxoptika .al",
    "Cel": '694000614',
    "Orari": "09:00-21:00",
    lat:40.725935,
    long: 19.559687
  }, {
    "Dyqani": "Max Optika Sarande",
    "Adresa": "Rruga Onhezmi, Sarande",
    "Email": "maxoptika.sarande@gmail.com",
    "Cel": '688034749',
    "Orari": "09:00-21:00",
    lat:39.874918,
    long: 20.005693
  }, {
    "Dyqani": "Max Optika Elbasan",
    "Adresa": "Rruga Rinia, Elbasan",
    "Email": "maxoptika.elbasan@gmail.com",
    "Cel": '694057812',
    "Orari": "09:00-21:00",
    lat:41.122471,
    long:  20.078612
  }, {
    "Dyqani": "Max Optika Korce",
    "Adresa": "Lagjja 9, Rruga Midhi Kostani, prane Bankes Kombetare, Korce",
    "Email": "korce@maxoptika.al",
    "Cel": '696098866',
    "Orari": "09:00-20:00",
    lat:40.616302,
    long: 20.776756
  }, {
    "Dyqani": "Max Optika Pogradec",
    "Adresa": "Rruga Refik Collaku,perballe hotel Enkelana, Pogradec",
    "Email": "maxoptika.pogradec@gmail.com",
    "Cel": '694045453',
    "Orari": "09:00-20:00",
    lat:40.900274,
    long: 20.657215
  }, {
    "Dyqani": "Max Optika Kruje",
    "Adresa": "Lagjja Sesere, qender Kruje",
    "Email": "maxoptika.kruje@gmail.com",
    "Cel": '694000611',
    "Orari": "09:00-21:00",
    lat:41.511444,
    long: 19.790840
  }, {
    "Dyqani": "Max Optika Lezhe",
    "Adresa": "Qendra Tregetare Net Center,Lezhe",
    "Email": "lezhe@maxoptika.al",
    "Cel": '689092403',
    "Orari": "09:00-21:00",
    lat:41.778749,
    long: 19.649009
  }, {
    "Dyqani": "Max Optika Shkoder",
    "Adresa": "Lagjja Qemal Stafa, Rruga 13 Dhjetori, Shkoder",
    "Email": "shkoder@maxoptika.al",
    "Cel": '696048850',
    "Orari": "09:00-21:00",
    lat:42.072124,
    long:  19.515109
  }, {
    "Dyqani": "Max Optika Prishtine",
    "Adresa": "Rruga Bulevardi I Deshmoreve, prane Aleances, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.656545,
    long: 21.168937
  }, {
    "Dyqani": "Max Optika Minimax",
    "Adresa": "Qendra tregtare Minimax, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.660741,
    long: 21.141244
  }];
  // $ionicPlatform.ready(function() {
  //   $ionicLoading.show({
  //     template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
  //   });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    // $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
    //   var addToJson = [];
    //   var lat = position.coords.latitude;
    //   var long = position.coords.longitude;
    //   // console.log("lat eshte "+lat);
    //   // console.log("long eshte "+long);
    //   // Keto jane koordinata statike te durresit, ne telefon keto duhet te hiqen dhe te lihen ato me siper
    //   // lat =41.322472;
    //   // long =19.450777;
    //   // lat-null;
    //   // long=null;

    //   for (var i = 0; i < $scope.adresses.length; i++) {
    //     var distanca=getDistanceFromLatLonInKm(lat,long,$scope.adresses[i].lat,$scope.adresses[i].long);
    //     $scope.adresses[i].distanca=distanca;
        
    //   }
    //   $scope.adresses.sort(function(a, b) {
    //       return parseFloat(a.distanca) - parseFloat(b.distanca);
    //   });
    //   $scope.emailiDyqAfer=$scope.adresses[0].Email
    //   console.log(typeof($scope.emailiDyqAfer));
    //   // $ionicLoading.show({
    //   //   template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Dyqani me afer jush u gjet!',
    //   //   duration: 1500
    //   // });


    // }, function (err) {
    //   $scope.emailiDyqAfer="agjini@dea.com.al";
    //   $ionicLoading.hide();
    //   // Careful here, this is needed
    //   //alert("Ju lutem aktivizoni location");
    // });

    
  // });
 
  }



      // Geolocation Script Ends


      $scope.active = 'lek';
      $scope.monedhaZgjedhur="lek";
      $scope.monedhaNameZgjedhur='LEK';

      $scope.setActive = function(type) {
        $scope.active = type;
        console.log(type);
        $scope.monedhaZgjedhur=type;
        $scope.monedhaNameZgjedhur=type;
        $scope.checkCurrencySelected();
      };

      $scope.isActive = function(type){
        //console.log(type);
        return type === $scope.active;
      };



      $scope.remBut=false;

      $scope.example={};

      $scope.checkCurrencySelected=function(){
        if ($scope.monedhaZgjedhur=="lek") {
          //console.log('po jam brenda');
          
          var total = $scope.response.reduce(function (r, a) {
                if (a.cmimiPromoLek !="") {
                  return r + Number(a.cmimiPromoLek) * Number($scope.example[a.kodartikulli]);
                }else{
                  return r + Number(a.cmimilek) * Number($scope.example[a.kodartikulli]);
                }

                
            }, 0);

          //console.log( $scope.example); 
           $scope.checkoutTotal=Number(total).toFixed(2);
           console.log('shuma eshte');
           console.log($scope.checkoutTotal);

        }else{
          console.log('nope jam brenda');
          var total = $scope.response.reduce(function (r, a) {
                if (a.cmimiPromoEur !="") {
                  return r + Number(a.cmimiPromoEur) * Number($scope.example[a.kodartikulli]);
                }else{
                  return r + Number(a.cmimieur) * Number($scope.example[a.kodartikulli]);
                }
            }, 0);

          //console.log( $scope.example); 
           $scope.checkoutTotal=Number(total).toFixed(2);
           console.log('shuma eshte');
           console.log($scope.checkoutTotal);
        }

      }
      
      

      $scope.minusElement=function (item, index, cmimi, monedha){
        
        
        $scope.example[item]=Number($scope.example[item])-1;
        if ($scope.example[item]<=0 ) {
        // not allowed to go below 1
        $scope.example[item]=1;
        }else if ($scope.example[item]>=1){
          //  var total = $scope.response.reduce(function (r, a) {
          //       return r + Number(a.cmimilek) * Number($scope.example[a.kodartikulli]);
          //   }, 0);

          // console.log( $scope.example); 
          // console.log( $scope.example);
          //  $scope.checkoutTotal=Number(total).toFixed(2);
          $scope.checkCurrencySelected();
        }



      }

      $scope.plusElement=function (item, index, cmimi, monedha){
        // #TODO konvertimi i cmimit nga EUR, LEK ne monedhen default
        if (monedha=="LEK") {
          var cmimiLek=cmimi*1.38;
          console.log('jam lek');
          console.log(cmimiLek);
        }

        $scope.example[item]=Number($scope.example[item])+1;

        if ($scope.example[item]<=0 ) {
        // $scope.checkoutTotal=$scope.checkoutTotal*Number($scope.example[item]);
        // do nothing
        $scope.example[item]=1;
        }else if ($scope.example[item]>=1){


          // var total = $scope.response.reduce(function (r, a) {
          //       return r + Number(a.cmimilek) * Number($scope.example[a.kodartikulli]);
          //   }, 0);

          // console.log( $scope.example); 
          //  $scope.checkoutTotal=Number(total).toFixed(2);
          $scope.checkCurrencySelected();

        }



      }

      // Check the number of elements in the cart and wishlist
      $scope.pojambosh=false;
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      $scope.shportaElem= shportlistItems;
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
        $scope.pojambosh=true;
        $scope.pojambosh2=false;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          $scope.shportlistItemsLength=null;
          $scope.pojambosh=true;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.response = {};
  // localStorage.removeItem('shporta');

  $scope.removeFromShporta = function(item) {

    
    var wsh = window.localStorage.shporta.split(',');
    var i = wsh.indexOf(item.target.id);
    console.log("eshte"+item.target.id);
    wsh.splice(i, 1);
    window.localStorage.shporta = wsh;
    
    // item.target.parent().parent().remove();
    // child.parentNode.removeParent(item.target.parentElement);
    // angular.element(item.target).parent().remove();
    item.target.hidden = true;
    item.target.parentElement.remove();




      console.log(item.target.parentElement.id);
      console.log($scope.response);
      console.log("pos");
       var pos = $scope.response.map(function(e) { return e.kodartikulli; }).indexOf(item.target.parentElement.id);
       console.log(pos);
       $scope.checkoutTotal=$scope.checkoutTotal-($scope.response[pos].cmimilek*$scope.example[item.target.parentElement.id]);
       $scope.checkoutTotal=$scope.checkoutTotal.toFixed(2);
       // console.log(item.target.parentElement.parentElement); 
       // console.log($scope.example[item.target.parentElement.id])


      // This is the code for removing an item without reloading but it also removes the "remove button from it's child".
       delete $scope.example[item.target.parentElement.id];
       // $scope.example[item.target.parentElement.id]=undefined;
       console.log($scope.response);

        for( i=$scope.response.length-1; i>=0; i--) {
        // for( i=0; i>$scope.response.length; i++) {
          if( $scope.response[i].kodartikulli == item.target.parentElement.id){
            $scope.response.splice(i,1);
            // $scope.response[i]=null;
            $scope.remBut=true;
          }
      }
      console.log($scope.response);


      var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
        $scope.wishbosh3=false;
        $scope.wishbosh=true;
        // $scope.wishbosh2=false;
        $scope.pojambosh=true;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
         // window.location.reload();
       }
       $scope.checkCurrencySelected();


       // $timeout(function() {
       //     var pos = $scope.response.map(function(e) { return e.kodartikulli; }).indexOf(item.target.parentElement.id);
       //     $scope.checkoutTotal=$scope.checkoutTotal-($scope.response[pos].cmimi*$scope.example[item.target.parentElement.id]);
       //     $scope.checkoutTotal=$scope.checkoutTotal.toFixed(2);
       //     // console.log(item.target.parentElement.parentElement); 
       //     // console.log($scope.example[item.target.parentElement.id])
       //     delete $scope.example[item.target.parentElement.id];
       //     // $scope.example[item.target.parentElement.id]=undefined;
       //     for( i=$scope.response.length-1; i>=0; i--) {
       //        if( $scope.response[i].kodartikulli == item.target.parentElement.id) $scope.response.splice(i,1);
       //    }


       //    }, 1000); 
       
  };

  $scope.getShporta = function() {
    var data = window.localStorage.getItem('shporta') || "";
    if ($scope.pojambosh==false) {
      $scope.pojambosh2=true;
      console.log('po nuk eshte thirr');

    }else{
      console.log('po nuk eshte thirr asd');
    }
    // console.log(typeof(data));
    // var varg = [];
    // var res = data.split(",");
    // varg.push(res);
    
    // console.log(res[0]);
    // var wishi = JSON.stringify(data.split(','));
    // console.log(typeof(wishi));
    // for (var i = 0; i<data.length; i ++) {
    //   console.log(data[i]+" "+i);
    // };
    // console.log(wishi);
    // console.log("id :"+data);
    if (data !== "") {
      $http({
        method: 'POST',
        url: 'https://max-optika-server.herokuapp.com/wishlist',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          wishlist: JSON.stringify(data.split(','))
        }
      }).success(function(response) {
        $scope.pojambosh2=false;
        console.log(response);
        $scope.response = response;
        // console.log($scope.response[0]);
        $scope.checkoutTotal=0;
        $scope.wishbosh3=true;



        for (var i in $scope.response) {
          // console.log($scope.response[i].name);
          var cmimiriModel=$scope.response[i].kodidoganorartikulli.split(';');
        //console.log(cmimiriModel);
         $scope.response[i].koleksioni=cmimiriModel[0];
        if(cmimiriModel[1]==undefined || cmimiriModel[2]==undefined){
          $scope.response[i].promocioni="";
          $scope.response[i].cmimiPromoLek="";
          $scope.response[i].cmimiPromoEur="";
        }else{
          //var replaced = str.split(' ').join('+');
          $scope.response[i].promocioni=cmimiriModel[1];
          $scope.response[i].cmimiPromoLek=cmimiriModel[2];
          $scope.response[i].cmimiPromoEur=cmimiriModel[3];
          }
          console.log($scope.response);

          if ($scope.response[i].cmimiPromoLek !="") {
            $scope.checkoutTotal=Number($scope.checkoutTotal)+Number($scope.response[i].cmimiPromoLek);
          }else{


          $scope.checkoutTotal=Number($scope.checkoutTotal)+Number($scope.response[i].cmimilek);
          }
          $scope.checkoutTotal=Number($scope.checkoutTotal).toFixed(2);


        }
        window.localStorage.setItem('cmimiFillestar', $scope.checkoutTotal);

      });

    };
  }
  $scope.getShporta();


//   $scope.wishbosh=false;
//   $scope.wishbosh2=true;
//   $scope.wishbosh3=false;

// $timeout(function() {
//   if (!$scope.response.length) {
//   $scope.wishbosh2=false;
//   $scope.wishbosh=true;
//   console.log('blabla');
  

//   }
// }, 3000); 
$scope.dyqanetLista=['21 Dhjetori','Sheshi Willson','Myslym Shyri','City Park','QTU','Durres','Shkoder','Vlore','Fier','Sarandë','Lushnje','Pogradec'];
$scope.dyqanetListaSelected={};
$scope.dyqanetListaSelected.dyqani='Zgjidhni nje dyqan';

$scope.vazhdoPorosine= function(allCmimi){
  $scope.gjejVendodhjen();
   // console.log(allCmimi);
   // var gjithCmimi=parseInt(allCmimi);
   // var gjithCmimi2=Number(allCmimi);
   // console.log(typeof(gjithCmimi));
   // console.log(typeof(gjithCmimi2));
   // gjithCmimi2=gjithCmimi2+1;
   // console.log(gjithCmimi2);
   // gjithCmimi2=gjithCmimi2-1;
   // console.log(gjithCmimi2);
   var gjithCmimi2=359;

   //alert(typeof(gjithCmimi));
    $ionicModal.fromTemplateUrl('templates/vazhdoPorosine.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });

      $scope.itens = [
        { title: "PayPal", checked: false },
        { title: "Pick Up On Store", checked: false },
        { title: "Pay On Delivery", checked: false },
    ];

    $scope.updateSelection = function(position, itens, title) {
        angular.forEach(itens, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
            }
        );
    }
    $scope.nextStep=function(){
      if ($scope.selected=="PayPal") {
        // alert("paypal");
        PaypalService.initPaymentUI().then(function () {
          PaypalService.makePayment(gjithCmimi2, "Total").then(function (response) {
            $ionicPopup.alert({
              title: 'Sukses',
              template: '<p align="center">Transaksioni perfundoi me sukses</p>'
            });

            console.log("success"+JSON.stringify(response));

            }, function (error) {
              console.log(error);
              $ionicPopup.alert({
                title: 'Gabim',
                template: '<p align="center">Transaksioni deshtoi</p>'
              });

            //alert("Transaction Canceled");

              });
          })
      }else if ($scope.selected=="Pick Up On Store") {
        $scope.modal.hide();
        $ionicModal.fromTemplateUrl('templates/zgjidhDyqanin.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modall = modal;
          $scope.modall.show();
        });

        $scope.nextStepPickUp=function(adresa){
          console.log($scope.dyqanetListaSelected.dyqani);

        $scope.modall.hide();
        $ionicLoading.show({
              template: 'Loading...',
              delay:100
            });
        // $scope.gjejVendodhjen();
        // console.log($scope.emailiDyqAfer);
        // alert("Store");
        console.log($scope.emailiDyqAfer);
        // console.log($scope.loggedInSakte);
        var dyqaniZgjedhur=$scope.dyqanetListaSelected.dyqani;
        var klientEmer=$scope.loggedInSakte.emer;
        var klientMbiemer=$scope.loggedInSakte.mbiemer;
        var klientTel=$scope.loggedInSakte.celular;
        var klientEmail=$scope.loggedInSakte.email;
        console.log(klientEmer+" "+klientMbiemer+" "+klientTel+" "+klientEmail);
        console.log($scope.shportaElem);


          $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/pick-up-store',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            emer: klientEmer,
            mbiemer: klientMbiemer,
            tel: klientTel,
            email: klientEmail,
            emailTo: $scope.emailiDyqAfer,
            dyqani: dyqaniZgjedhur,
            shportaElem: $scope.shportaElem.toString()
          }
        }).success(function(response) {
          
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          $scope.getShnamo('merr','bosh', "Pick Up On Store");
          if (response.sentPickUp==1) {
           // $scope.showAlertForgotPasswordSuccess();
           var pergjigjeDyqan='Dyqani '+dyqaniZgjedhur+' u lajmerua per blerjen tuaj!';
           $ionicLoading.show({
              template: pergjigjeDyqan,
              duration: 3000
            });

          }else if (response.sentPickUp==0) {
            // $scope.showAlertNotEmail();
            $ionicLoading.show({
              template: 'Lajmerimi i Dyqanit deshtoi,<br> ju lutemi provojeni perseri!',
              duration: 3000
            });

          }       

        });
        console.log('')

        }

        
        
      }else if ($scope.selected=="Pay On Delivery") {
        $scope.modal.hide();
        $ionicModal.fromTemplateUrl('templates/insertAdresa.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modall = modal;
          $scope.modall.show();
        });
        // alert("Delivery");
        $scope.nextStepPayD=function(item){
          $scope.modall.hide();
          $ionicLoading.show({
              template: 'Loading...',
              delay:100
            });
          console.log(item);

        // console.log($scope.emailiDyqAfer);
        // console.log($scope.loggedInSakte);
        var klientAdresa=item;
        var klientEmer=$scope.loggedInSakte.emer;
        var klientMbiemer=$scope.loggedInSakte.mbiemer;
        var klientTel=$scope.loggedInSakte.celular;
        var klientEmail=$scope.loggedInSakte.email;
        console.log(klientEmer+" "+klientMbiemer+" "+klientTel+" "+klientEmail);
        console.log($scope.shportaElem);


          $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://max-optika-server.herokuapp.com/pay-on-delivery',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            emer: klientEmer,
            mbiemer: klientMbiemer,
            tel: klientTel,
            email: klientEmail,
            emailTo: $scope.emailiDyqAfer,
            adresa: klientAdresa,
            shportaElem: $scope.shportaElem.toString()
          }
        }).success(function(response) {
          
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          if (response.sentPayD==1) {
           // $scope.showAlertForgotPasswordSuccess();
           $scope.getShnamo('merr','bosh', "Pay On Delivery");
           $ionicLoading.show({
              template: 'Qendra u lajmerua. Nje agjent i joni do te ju kontaktoje!',
              duration: 3000
            });

          }else if (response.sentPayD==0) {
            // $scope.showAlertNotEmail();
            $ionicLoading.show({
              template: 'Lajmerimi i qendres deshtoi,<br> ju lutemi provojeni perseri!',
              duration: 3000
            });

          }       

        });







        }
      }else if ($scope.selected==undefined) {
        alert("Please select one method of payment");
      }
      
    }



}


            

 


  })


.controller('historiaCtrl', function($scope, $http, $stateParams, $rootScope, $timeout, $ionicModal,PaypalService, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');





      $scope.active = 'lek';
      $scope.monedhaZgjedhur="lek";
      $scope.monedhaNameZgjedhur='LEK';

      $scope.setActive = function(type) {
        $scope.active = type;
        console.log(type);
        $scope.monedhaZgjedhur=type;
        $scope.monedhaNameZgjedhur=type;
        $scope.checkCurrencySelected();
      };

      $scope.isActive = function(type){
        //console.log(type);
        return type === $scope.active;
      };



      $scope.remBut=false;

      $scope.example={};


      // Check the number of elements in the cart and wishlist
      $scope.pojambosh=false;
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      $scope.shportaElem= shportlistItems;
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
        $scope.pojambosh=true;
        $scope.pojambosh2=false;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          $scope.shportlistItemsLength=null;
          $scope.pojambosh=true;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.response = {};
  // localStorage.removeItem('shporta');
  var actionK='merr';


      $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/get-orders',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         action : actionK,
         idd: 45
       }
     }).success(function(response) {
      console.log('pergjigja eshte');
      console.log(response);

     });



  $scope.getShporta = function() {
    var data = window.localStorage.getItem('shporta') || "";
    if ($scope.pojambosh==false) {
      $scope.pojambosh2=true;
      console.log('po nuk eshte thirr');

    }else{
      console.log('po nuk eshte thirr asd');
    }

    if (data !== "") {
      $http({
        method: 'POST',
        url: 'https://max-optika-server.herokuapp.com/wishlist',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          wishlist: JSON.stringify(data.split(','))
        }
      }).success(function(response) {
        $scope.pojambosh2=false;
        console.log(response);
        $scope.response = response;
        // console.log($scope.response[0]);
        $scope.checkoutTotal=0;
        $scope.wishbosh3=true;



        for (var i in $scope.response) {
          // console.log($scope.response[i].name);
          var cmimiriModel=$scope.response[i].kodidoganorartikulli.split(';');
        //console.log(cmimiriModel);
         $scope.response[i].koleksioni=cmimiriModel[0];
        if(cmimiriModel[1]==undefined || cmimiriModel[2]==undefined){
          $scope.response[i].promocioni="";
          $scope.response[i].cmimiPromoLek="";
          $scope.response[i].cmimiPromoEur="";
        }else{
          //var replaced = str.split(' ').join('+');
          $scope.response[i].promocioni=cmimiriModel[1];
          $scope.response[i].cmimiPromoLek=cmimiriModel[2];
          $scope.response[i].cmimiPromoEur=cmimiriModel[3];
          }
          console.log($scope.response);

          if ($scope.response[i].cmimiPromoLek !="") {
            $scope.checkoutTotal=Number($scope.checkoutTotal)+Number($scope.response[i].cmimiPromoLek);
          }else{


          $scope.checkoutTotal=Number($scope.checkoutTotal)+Number($scope.response[i].cmimilek);
          }
          $scope.checkoutTotal=Number($scope.checkoutTotal).toFixed(2);


        }
        window.localStorage.setItem('cmimiFillestar', $scope.checkoutTotal);

      });

    };
  }
  $scope.getShporta();
 

  })


.controller('searchCtrl', function($scope, $http, $stateParams, $rootScope, $timeout) {

$scope.remove_duplicates= function(origArr) {
      var newArr = [],
          origLen = origArr.length,
          found, x, y;

      for (x = 0; x < origLen; x++) {
          found = undefined;
          for (y = 0; y < newArr.length; y++) {
              if (origArr[x] === newArr[y]) {
                  found = true;
                  break;
              }
          }
          if (!found) {
              newArr.push(origArr[x]);
          }
      }
      return newArr;
  }

$scope.cleanArray= function(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }



      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

      
      $scope.kerkimiFjala=window.localStorage.getItem('searchiKerk');
      // $scope.syzeSearch2=[];
      // $scope.syzeSearch2=window.localStorage.getItem('rezultateKerkimi');
      // $scope.syzeSearch=JSON.parse($scope.syzeSearch2);
      // console.log($scope.syzeSearch);
      // localStorage.removeItem('rezultateKerkimi');


          $scope.kerkimiFjala2=[];
          $scope.kerkimiFjala2=$scope.kerkimiFjala.split(/\s+/g);

          $scope.kerkobosh3=false;
          $scope.kerkobosh2=true;
          $scope.syzeD   = [];
          $scope.markaSyzesh = [];
          $scope.formaSyzesh = [];

          // Make an ajax call to database

          $http({
            method: 'POST',
            url: 'https://max-optika-server.herokuapp.com/search-result',
            cach: false,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
              var str = [];
              for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            },
            data: {
              kerkimiFjala: $scope.kerkimiFjala2
            }
          }).success(function(response) {
            $scope.syzeSearch = response;
            console.log(response);
            if (response.length==0) {
              $scope.kerkobosh2=false;
              $scope.kerkobosh3=true;
            }else{
              $scope.kerkobosh3=false;
            


       response.forEach(function(item){
        $scope.syzeD.push(item);
        $scope.markaSyzesh.push(item.kodifikimartikulli2);
        $scope.formaSyzesh.push(item.zonakadastrale);

        

      });
       $scope.markaSyzesh = $scope.remove_duplicates($scope.markaSyzesh);
       $scope.formaSyzesh = $scope.remove_duplicates($scope.formaSyzesh);
       $scope.formaSyzesh = $scope.cleanArray($scope.formaSyzesh);
       // console.log($scope.markaSyzesh);
       // console.log($scope.formaSyzesh);

        $scope.syzeD.forEach( function(element, index) {
        element.pershkrimiangartikulliNew=element.pershkrimiangartikulli.slice(3);
        var cmimiriModel=element.kodidoganorartikulli.split(';');
        //console.log(cmimiriModel);
        element.kodidoganorartikulli=cmimiriModel[0];
        if(cmimiriModel[1]==undefined || cmimiriModel[2]==undefined){
          element.promocioni="";
          element.cmimiPromoLek="";
          element.cmimiPromoEur="";
        }else{
          //var replaced = str.split(' ').join('+');
          element.promocioni=cmimiriModel[1];
          element.cmimiPromoLek=cmimiriModel[2];
          element.cmimiPromoEur=cmimiriModel[3];
          }
          element.promocioni=element.promocioni.split(' ').join('\n');



       });

}








            // console.log(response);
            // if ($scope.syzeSearch.length==0) {
            //   $scope.kerkobosh2=false;
            //   $scope.kerkobosh3=true;
            // }else{
            //   $scope.kerkobosh3=false;
            // }

          });




        console.log($scope.kerkimiFjala2);


      





  $scope.response = {};
  // localStorage.removeItem('shporta');


  })






.controller('EmployeeReportsCtrl', function($scope, $stateParams, Employees) {
  console.log('reports');
  $scope.employee = Employees.get({
    employeeId: $stateParams.employeeId,
    data: 'reports'
  });
})

.controller('kartelaCtrl', function($scope, $stateParams, $http, $timeout) {

      $scope.showSpinner=true;

      $scope.userPaKartele = false;
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
  $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
  //console.log($scope.loggedInSakte);
  $scope.data = {};
  $scope.data.id = $scope.loggedInSakte.user_id;
  $scope.data.klient_id = $scope.loggedInSakte.id;
  console.log($scope.data);

  $scope.fshi= function(numer){
    console.log(numer);
    //$scope.vizita1=!$scope.vizita1;
    $scope['vizita'+numer]=!$scope['vizita'+numer];
  }


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/kartela-klinike',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         client_id: $scope.data.klient_id,
      id: $scope.data.id
       }
     }).success(function(response) {
      $scope.showSpinner=false;
      console.log(response);

        if (response.paRezultat==0) {

          $scope.userPaKartele=true;

          $timeout(function () { 
            $scope.userPaKartele = false; 
          }, 10000);
          
        }else{
          $scope.data.clinic = response;
          $scope.data.clinic.forEach( function(element, index) {
            element.data_vizites = new Date(Date.parse(element.data_vizites)).toLocaleDateString('en-GB');
          });
          console.log($scope.data.clinic);
          
        
        }
      });



})

.controller('takimCtrl', function($scope, $stateParams, $http, $ionicPopup, $window, $timeout, $ionicScrollDelegate, $location) {
      
  $scope.maxP=5;
  $scope.listaOrareve=[];
  $scope.shfaqLoadingOraret=false;
  $scope.oraModel = { checked: "" };


      





  $scope.oraretngdb=["02/01/2017","02/02/2017","02/03/2017","02/04/2017","02/05/2017","03/30/2017","05/01/2017","05/17/2017","06/11/2017","06/15/2017","06/16/2017","06/21/2017","07/12/2017","08/18/2017","08/23/2017","11/15/2017","11/25/2017","01/02/2018"];

      $scope.userPaPrenotim = false;
      $scope.showtakim=false;
      $scope.showSpinner=true;
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
  $scope.shfaqRezervim = function() {
    if ($scope.showtakim==true) {
      $scope.showtakim=false;
    }else{
      $scope.showtakim=true;
      $location.hash('rezervimi');   //set the location hash
      var handle = $ionicScrollDelegate.$getByHandle('myPageDelegate');
      handle.anchorScroll(true);  // 'true' for animation
    }
  }


  $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
  $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
  //console.log($scope.loggedInSakte);
  $scope.data = {};
  $scope.data.id = $scope.loggedInSakte.user_id;
  $scope.data.klient_id = $scope.loggedInSakte.id;
  $scope.data.emer = $scope.loggedInSakte.emer;
  $scope.data.mbiemer = $scope.loggedInSakte.mbiemer;
  $scope.data.celular = $scope.loggedInSakte.celular;
  console.log($scope.data);
  $scope.response = {};
  $scope.data.dyqan="bosh";
  $scope.rezervimeGjitha;


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/getTakim',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         id : $scope.data.id
       }
     }).success(function(response) {
      $scope.showSpinner=false;
      if (response.length==0) {
        $scope.userPaPrenotim=true;

          $timeout(function () { 
            $scope.userPaPrenotim = false; 
          }, 10000);
      }else{
        console.log(response);
        console.log("rezervimet");
        $scope.rezervimeGjitha=response;
        //$scope.syze = response;
        //console.log("trt"+$scope.syze);
      }
          
      });
$scope.dyqanet={};


  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://max-optika-server.herokuapp.com/getOrariDyqan',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
       }
     }).success(function(response) {
      //console.log(response);
      console.log('tgh');
      response.forEach( function(element, index) {
        var dyqanett={};
        // statements
        //console.log(element);
        if(element.dyqani=='durres'){
            element.dyqani='Durres';
        }else if(element.dyqani=='dhjetori'){
            element.dyqani='21 Dhjetori';
        }else if(element.dyqani=='fier'){
            element.dyqani='Fier';
        }else if(element.dyqani=='lushnje'){
            element.dyqani='Lushnje';
        }else if(element.dyqani=='mshyri'){
            element.dyqani='Myslym Shyri';
        }else if(element.dyqani=='pogradec'){
            element.dyqani='Pogradec';
        }else if(element.dyqani=='qtu'){
            element.dyqani='QTU';
        }else if(element.dyqani=='sarande'){
            element.dyqani='Sarandë';
        }else if(element.dyqani=='sheshiwillson'){
            element.dyqani='Sheshi Willson';
        }else if(element.dyqani=='shkoder'){
            element.dyqani='Shkoder';
        }else if(element.dyqani=='vlore'){
            element.dyqani='Vlore';
        }

        dyqanett.emri=element.dyqani;

        dyqanett.oraret=element;
        for(var key in element) {
            element[key] = element[key].split(',');
        }
        $scope.dyqanet[element.dyqani]=dyqanett;
        delete element['dyqani'];
          
      });
      console.log($scope.dyqanet);
      // $scope.dyqanet2={
      //       'fier':{
      //         'emri':'Fier',
      //         'oraret':{
      //           'hene':[],
      //           'marte':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
      //           'merkure':[],
      //           'enjte':['16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
      //           'premte':[],
      //           'shtune':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
      //           'diele':[]
      //           }
      //         },
      //       }
      // console.log($scope.dyqanet2);
      // $scope.showSpinner=false;
      // if (response.length==0) {
      //   $scope.userPaPrenotim=true;

      //     $timeout(function () { 
      //       $scope.userPaPrenotim = false; 
      //     }, 10000);
      // }else{
      //   console.log(response);
      //   console.log("rezervimet");
      //   $scope.rezervimeGjitha=response;
      //   //$scope.syze = response;
      //   //console.log("trt"+$scope.syze);
      // }
          
      });


  // $scope.dyqanet={
  //   'fier':{
  //     'emri':'Fier',
  //     'oraret':{
  //       'hene':[],
  //       'marte':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'merkure':[],
  //       'enjte':['16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'premte':[],
  //       'shtune':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'diele':[]
  //       }
  //     },
  //   'sarande':{
  //     'emri':'Sarandë',
  //     'oraret':{
  //       'hene':[],
  //       'marte':[],
  //       'merkure':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00','15:00-15:20','15:20-15:40','15:40-16:00'],
  //       'enjte':[],
  //       'premte':[],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'vlore':{
  //     'emri':'Vlore',
  //     'oraret':{
  //       'hene':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'marte':[],
  //       'merkure':[],
  //       'enjte':[],
  //       'premte':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'lushnje':{
  //     'emri':'Lushnje',
  //     'oraret':{
  //       'hene':[],
  //       'marte':[],
  //       'merkure':[],
  //       'enjte':['10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00'],
  //       'premte':[],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'shkoder':{
  //     'emri':'Shkoder',
  //     'oraret':{
  //       'hene':[],
  //       'marte':['11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00','15:00-15:20','15:20-15:40','16:00-16:20','16:20-16:40','16:40-17:00'],
  //       'merkure':[],
  //       'enjte':[],
  //       'premte':[],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'pogradec':{
  //     'emri':'Pogradec',
  //     'oraret':{
  //       'hene':[],
  //       'marte':[],
  //       'merkure':['09:20-09:40','09:40-10:00','10:00-10:20','10:20-10:40','10:40-11:00','11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00'],
  //       'enjte':[],
  //       'premte':[],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'durres':{
  //     'emri':'Durres',
  //     'oraret':{
  //       'hene':['18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'marte':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00','18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'merkure':['18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'enjte':['18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'premte':['18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'shtune':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00','18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00'],
  //       'diele':['18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:40','19:40-20:00']
  //       }
  //     },
  //   '21dhjetori':{
  //     'emri':'21 Dhjetori',
  //     'oraret':{
  //       'hene':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00','14:00-14:20','14:20-14:40','14:40-15:00','15:00-15:20','15:20-15:45'],
  //       'marte':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'merkure':[],
  //       'enjte':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'premte':['11:00-11:20','11:20-11:40','11:40-12:00','12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'shtune':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'diele':[]
  //       }
  //     },
  //   'sheshi_willson':{
  //     'emri':'Sheshi Willson',
  //     'oraret':{
  //       'hene':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'marte':[],
  //       'merkure':[],
  //       'enjte':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'premte':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'shtune':[],
  //       'diele':[]
  //       }
  //     },
  //   'myslym_shyri':{
  //     'emri':'Myslym Shyri',
  //     'oraret':{
  //       'hene':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'marte':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'merkure':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'enjte':['16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'premte':['14:20-14:40','14:40-15:00','15:00-15:20','15:20-15:40','16:00-16:20','16:20-16:40','16:40-17:00'],
  //       'shtune':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:40','13:40-14:00'],
  //       'diele':['12:00-12:20','12:20-12:40','12:40-13:00','13:00-13:20','13:20-13:45']
  //       }
  //     },
  //   'qtu':{
  //     'emri':'QTU',
  //     'oraret':{
  //       'hene':['16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'marte':['16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'merkure':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'enjte':['16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00','19:00-19:20','19:20-19:30'],
  //       'premte':['17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'shtune':['16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00'],
  //       'diele':['16:00-16:20','16:20-16:40','16:40-17:00','17:00-17:20','17:20-17:40','17:40-18:00','18:00-18:20','18:20-18:40','18:40-19:00']
  //       }
  //     },
  // }

  $scope.dyqanetLista=['21 Dhjetori','Sheshi Willson','Myslym Shyri','QTU','Durres','Shkoder','Vlore','Fier','Sarandë','Lushnje','Pogradec'];
  console.log($scope.dyqanet);
  console.log($scope.dyqanetLista);
  $scope.dyqanetListaSelected={};
  $scope.dyqanetListaSelected.dyqani='Zgjidhni nje dyqan';

 


  $scope.testdates=function(){
    console.log('po therrimet nga directiva');
    console.log($scope.maxP);
    var numer=5;

    var dataSelected=$scope.getDateSelected();
    $scope.dataSelected2=dataSelected;
    if (!dataSelected) {
      $scope.shfaqOrett=false;
      console.log('nuk eshte zgjedh');
      $scope.listaOrareve=[];
      dataSelected='';
      $scope.oraModel.checked='';
      $scope.$apply();
    }else{
      console.log('eshte zgjedh');
      $scope.shfaqOrett=true;
      $scope.shfaqLoadingOraret=true;
    
    console.log('data eshte');
    console.log(dataSelected);

    // Get the day of the week from that date selected

    var days = ['diele', 'hene', 'marte', 'merkure', 'enjte', 'premte', 'shtune'];
    var d = new Date(dataSelected);
    var dayName = days[d.getDay()];
    console.log(dayName);

      for (var key in $scope.dyqanet) {
        if ($scope.dyqanet.hasOwnProperty(key)) {
          //console.log(key + " -> " + $scope.dyqanet[key]);
          // Select the correct dyqani
          if ($scope.dyqanet[key].emri==$scope.dyqaniZ) {

            // $scope.dyqanet[key].oraret.forEach( function(element, index) {
            //   // statements
            // });
            var tempObject=$scope.dyqanet[key];
            //console.log(tempObject);
            // separate all oraret from that object
            for (var key2 in tempObject) {
              if (key2=='oraret') {
                var tempObject2=tempObject[key2];
                //console.log(tempObject2);

                for (var key3 in tempObject2) {

                  



                  //console.log(key3);
                  if (key3==dayName) {
                    $scope.listaOrareve2=tempObject2[key3];
                    console.log($scope.listaOrareve2);


                    $http({
                      method: 'POST',
                      url: 'https://max-optika-server.herokuapp.com/oraretZene',
                      cach: false,
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                      },
                      data: {
                        dataZgjdhur: dataSelected,
                        dyqani: $scope.dyqaniZ
                      }
                    }).success(function(response) {
                      $scope.shfaqLoadingOraret=false;
                      $scope.listaOrareve=$scope.listaOrareve2;
                      // console.log(response.rows[0]);
                      // console.log($scope.listaOrareve);
                      //console.log(typeof response);

                      if (response.rowCount!=0) {
                        $scope.dataExists=true;
                        // Get all clients that have made a reservation in this day
                        $scope.allClients=response.rows[0].klientet.split(',');
                        // Get current loggedin client
                        console.log($scope.allClients);
                        console.log($scope.loggedInSakte.id);
                        jQuery('#butoniRezervo').prop('disabled', false);
                        console.log('butoni enable');
                        $scope.allClients.forEach( function(element, index) {
                          if (element==$scope.loggedInSakte.id) {
                            console.log('2');
                            
                            jQuery('#butoniRezervo').prop('disabled', true);
                            //alert('Ju nuk mund te beni me shume se 1 rezervin ne dite!');
                            $ionicPopup.alert({
                               title: 'Gabim',
                               template: '<p align="center">Ju nuk mund te beni me shume se 1 rezervin ne dite!</p>'
                             });
                            
                          }else{
                            $scope.allClients='';
                            console.log('jam enable butoni');
                            
                          }

                        });


                        var oraretDBZene=response.rows[0].oraret;
                        
                        oraretDBZene=oraretDBZene.split(',');
                        console.log(oraretDBZene);

                        for (var i = 0; i<oraretDBZene.length; i++) {
                            var arrlen = $scope.listaOrareve.length;
                            for (var j = 0; j<arrlen; j++) {
                                if (oraretDBZene[i] == $scope.listaOrareve[j]) {
                                    $scope.listaOrareve = $scope.listaOrareve.slice(0, j).concat($scope.listaOrareve.slice(j+1, arrlen));
                                }
                            }
                        }

                        //console.log($scope.listaOrareve);
                        //console.log('bla');
                        if ($scope.listaOrareve.length==0) {
                          $scope.listaOrareve=[];
                          $scope.showNoDate=true;
                        }else{
                          $scope.showNoDate=false;
                          //$scope.$apply();
                        }

                      } else {
                        $scope.dataExists=false;
                        jQuery('#butoniRezervo').prop('disabled', false);
                        // $ionicPopup.alert({
                        //   title: 'Rezervo Takim',
                        //   template: '<p align="center">Rezervimi nuk mund te kryhet per momentin. Ju lutemi provoni serisht me vone!</p>'
                        // });
                      }
                    });


                  }

                }




              }

            }


            //console.log($scope.dyqanet[key]);
          }
        }
      }

}



    //return numer;
  }

$scope.dataSelected2='01/01/2017';

  $scope.dyqaniNdryshoi = function(dyqani){
    console.log('u thirr nga jquery');
    console.log(dyqani);
    $scope.dyqaniZ=dyqani;
    
    $scope.disableDays(dyqani);
    //console.log($scope.dataSelected2);
    $scope.deSelectDate($scope.dataSelected2);
    $scope.shfaqOrett=false;
    
  }





  $scope.rezervo = function() {
    

    //$scope.data.date=jQuery('#mdp-demo').multiDatesPicker('getDates')[0];
    console.log($scope.oraModel.checked);
    console.log($scope.dyqaniZ);
    console.log($scope.dataSelected2);
    console.log($scope.data.shenime);
    // var days = ['diele', 'hene', 'marte', 'merkure', 'enjte', 'premte', 'shtune'];
    // var d = new Date($scope.data.date);
    // var dayName = days[d.getDay()];
    // console.log(dayName);
    // console.log('siper');




    // $scope.dataExists=$window.dataExists;
    // console.log($scope.dataExists);
    // console.log("siper");
    if ($scope.dyqaniZ == undefined || $scope.dyqaniZ == '' || $scope.dyqaniZ == 'Zgjidhni nje dyqan' || $scope.dataSelected2 === undefined || $scope.dataSelected2 == '' ||
      $scope.oraModel.checked == undefined || $scope.oraModel.checked == '' || $scope.data.shenime === undefined) {
          $ionicPopup.alert({
             title: 'Gabim',
             template: '<p align="center">Ju lutemi plotesoni gjithe te dhenat!</p>'
           });
    } else {
      $scope.shfaqLoadingRezervim=true;
      jQuery('#butoniRezervo').prop('disabled', true);
      console.log('Success');
      $http({
        method: 'POST',
        url: 'https://max-optika-server.herokuapp.com/takim',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          date: $scope.dataSelected2,
          ora: $scope.oraModel.checked,
          shenime: $scope.data.shenime,
          dyqan: $scope.dyqaniZ,
          id: $scope.data.id,
          dataExists: $scope.dataExists,
          klient_id: $scope.data.klient_id,
          emer: $scope.data.emer,
          mbiemer: $scope.data.mbiemer,
          celular: $scope.data.celular
        }
      }).success(function(response) {
        jQuery('#butoniRezervo').prop('disabled', false);
        $scope.shfaqLoadingRezervim=false;
        console.log(response);
        console.log(response.success);
        //console.log(typeof response);
        if (response.success==1) {
          $ionicPopup.alert({
            title: 'Rezervo Takim',
            template: '<p align="center">Rezervimi u krye me sukses!</p>'
          });
          $scope.dyqanetListaSelected.dyqani='Zgjidhni nje dyqan';
          $scope.dyqaniZ='Zgjidhni nje dyqan';
          $scope.disableDays('Zgjidhni nje dyqan');
          $scope.deSelectDate($scope.dataSelected2);
          $scope.shfaqOrett=false;
          //$('selector').datepicker('setDate')

        }else if(response.success==2){
          $ionicPopup.alert({
            title: 'Rezervo Takim',
            template: '<p align="center">Rezervimi nuk mund te kryhet per momentin. Ju lutemi provoni serisht me vone!</p>'
          });

        } else {
          $ionicPopup.alert({
            title: 'Rezervo Takim',
            template: '<p align="center">Rezervimi nuk mund te kryhet per momentin. Ju lutemi provoni serisht me vone!</p>'
          });
        }
      });
    }
  };
})

.controller('sherbimeCtrl', function($scope, $stateParams) {

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');


      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


    $scope.loggedin = false;
    if (window.localStorage.token !== "empty" && window.localStorage.token !== undefined) {
      $scope.loggedin = true;
    }
  })
  .controller('profileCtrl', function($scope, $stateParams) {

    $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
    $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
    console.log($scope.loggedInSakte);
    $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');

      
      $scope.logout = function() {
        console.log('Loogggout');
        window.localStorage.removeItem('loggedInSakte');
        window.localStorage.removeItem('loggedInSakte2');
        $scope.loggedInSakte2=false;
        // If user has loged in with facebook then log him/her out
        if (window.localStorage.getItem('fbl')) {
          window.localStorage.removeItem('fbl');
          //$scope.loggedin = true;
          ngFB.logout();
        }
        // window.location.reload(true);
      };


      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Profile');
  })

  .controller('rrethNeshCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Rreth Nesh');
  })


  .controller('lenteBalloreCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Rreth Nesh');
  })

  .controller('kontaktCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Kontakt');
  })

  .controller('pagesatCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Menyrat e pagesave');
  })

  .controller('privacyPolicyCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Menyrat e pagesave');
  })


.controller('KamerCtrl', function($scope, $cordovaCamera, $ionicSideMenuDelegate, $ionicModal, $http, $cordovaSocialSharing, html2canvasAngular, $ionicLoading, $q, $timeout) {

  // $scope.shareAnywhere = function() {
  //       $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
  //   }

  // $cordovaSocialSharing
  //   .share("This is your message", "This is your subject", canvas.toDataURL(), "https://www.thepolyglotdeveloper.com") // Share via native share sheet
  //   .then(function(result) {
  //     // Success!
  //     alert('sukses');
  //     alert(result);
  //   }, function(err) {
  //     alert(err);
  //     // An error occured. Show a message to the user
  //   });



$scope.loadingPerfundoi=true;

  //the controller
$scope.totalDisplayed = 10;

$scope.scrollEnd = function () {
  $scope.totalDisplayed += 10;
  if ($scope.syzetFront4.length<=$scope.totalDisplayed) {
    $scope.noMorePictures=true;
  }else{
    $scope.noMorePictures=false;
  }
};



    $scope.saveDivAsScreenShoot  = function(){
      $ionicLoading.show({
         template: 'Loading...'
      });

        jQuery('.angular-dnd-resizable-handle-se').hide();
        html2canvasAngular.renderBody().then(function(canvas){
          jQuery('.angular-dnd-resizable-handle-se').show();        
          $cordovaSocialSharing
            .share("Max Optika", "Max Optika", canvas.toDataURL(), "http://maxoptika.al/") // Share via native share sheet
            .then(function(result) {
              $ionicLoading.hide();
              // Success!
              //alert('sukses');
              //alert(result);
            }, function(err) {
              //alert(err);
              // An error occured. Show a message to the user
            });
          // console.log(canvas);
          // console.log("test me screen");
          //document.getElementById("tryOnID").appendChild(canvas);
        });
      }
  
  

    //   $scope.takeImage = function() {
    //     var options = {
    //         quality: 80,
    //         destinationType: Camera.DestinationType.DATA_URL,
    //         sourceType: Camera.PictureSourceType.CAMERA,
    //         allowEdit: true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 250,
    //         targetHeight: 250,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: true,
    //         cameraDirection:1
    //     };
         
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //         $scope.srcImage = "data:image/jpeg;base64," + imageData;
    //     }, function(err) {
    //         // error
    //     });
    // }

        $scope.takeImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            cameraDirection:1
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }
    $scope.loadImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }

    //$scope.takeImage(); 

    // Load all products here


  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time and
  $scope.offsetD = 0;
  $scope.syzetFront   = [];
  $scope.syzetFront2   = [];
  $scope.syzetFront3   = [];
  $scope.syzetFront4   = [];
  $scope.countForBackUp   = 1;


     var count = 1;

     $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);

           $http({
       method: 'POST',
       url: 'https://max-optika-server.herokuapp.com/syze-optike',
       // url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);

      
      // Get only the vendodhja part from the ajax response
      response.forEach(function(item){
        $scope.syzetFront.push(item.vendodhjeartikulli);
      });

       // Split the string and get all the views in an array 
       $scope.syzetFront.forEach(function(item){
          var res = item.split(";");

          res.forEach( function(element, index) {
            $scope.syzetFront2.push(element);
          });

        
        });

       // Split the view into 2 parts: the id and the view direction
       $scope.syzetFront2.forEach(function(item){
          var res = item.split("_");

          // If the view direction is front then added to our array
          res.forEach( function(element, index) {
            if (element=="front") {
              $scope.syzetFront3.push(item);
            }
            
          });

        
        });

      jQuery.each($scope.syzetFront3, function(i, el){
          if(jQuery.inArray(el, $scope.syzetFront4) === -1) $scope.syzetFront4.push(el);
      });
       console.log($scope.syzetFront4);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       //console.log($scope.offsetD);
     });








      
      // Get only the vendodhja part from the ajax response
      response.forEach(function(item){
        $scope.syzetFront.push(item.vendodhjeartikulli);
      });

       // Split the string and get all the views in an array 
       $scope.syzetFront.forEach(function(item){
          var res = item.split(";");

          res.forEach( function(element, index) {
            $scope.syzetFront2.push(element);
          });

        
        });

       // Split the view into 2 parts: the id and the view direction
       $scope.syzetFront2.forEach(function(item){
          var res = item.split("_");

          // If the view direction is front then added to our array
          res.forEach( function(element, index) {
            if (element=="front") {
              $scope.syzetFront3.push(item);
            }
            
          });

        
        });

      jQuery.each($scope.syzetFront3, function(i, el){
          if(jQuery.inArray(el, $scope.syzetFront4) === -1) $scope.syzetFront4.push(el);
      });
       console.log($scope.syzetFront4);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       //console.log($scope.offsetD);
     });

     


       $scope.$on('dataLoaded', function(ngRepeatFinishedEvent) {
        // your code to check whether images has loaded
        var promises = [];
        var imageList = jQuery('#syzeFoto img');
        console.log(imageList);
        for(var i = 0; i < imageList.length; i++) {

          // imageList[i].on('load', function() {
          //   promises.push(imageList[i]);
          // });

            imageList[i] = new Image(imageList[i]);
            imageList[i].onload = function(){
              //console.log('loading complete');
                promises.push(imageList[i]);
            };

          // imageList[i].on("load", function() {
          //       console.log('loading complete');
          //       promises.push(imageList[i]);
          //   });

            // promises.push(imageList[i].on('load', function() {}););
        }
        $q.all(promises).then(function(){
            // all images finished loading now
            console.log('te gjitha fotot u ngarkuan me sukses');
            $scope.loadingPerfundoi=false;
        });
    });















      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $ionicModal.fromTemplateUrl('templates/udhezimeModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

  $timeout(function () { 
       $scope.modal.hide();
     }, 3000);

          

    // $scope.takeImage = function() {
    //     var options = {
    //         quality: 80,
    //         destinationType: Camera.DestinationType.DATA_URL,
    //         sourceType: Camera.PictureSourceType.CAMERA,
    //         allowEdit: true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 250,
    //         targetHeight: 250,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: true
    //     };
         
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //         $scope.srcImage = "data:image/jpeg;base64," + imageData;
    //     }, function(err) {
    //         // error
    //     });
    // }

      $scope.takeImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            cameraDirection:1
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }

    $scope.loadImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }

        $scope.$on('$stateChangeSuccess', function () {
            $ionicSideMenuDelegate.canDragContent(false);
            window.screen.orientation.lock('portrait');
            //alert("u bera lock");
            // console.log('u thirrr 2');
          });
        $scope.$on('$stateChangeStart', function () {
            $ionicSideMenuDelegate.canDragContent(true);
            window.screen.orientation.unlock();
            //alert("nuk u bera lock");
            // console.log('iku');
          });


//         window.screen.orientation.lock('portrait');
// alert("u bera lock");

// $scope.$on('$ionicView.beforeEnter', function(){
//     window.screen.orientation.lock('portrait');
//     alert("u bera lock");
// });


        this.rect = {
          "width":"150px",
          "height":"150px",
          "top":"147px",
          "left":"300px"
        };


        // $scope.images=[{
        //   default: "img/dummy.jpg"

        // }];
        $scope.images=['img/tryon/SD12203_front.png','img/tryon/SD12207_front.png','img/tryon/SD12224_front.png','img/tryon/SD12228_front.png'];

        $scope.testImage='http://maxoptika-app.com/maxoptikaFTP/SD12178_front.png';
        $scope.shtoLart=function(fotoUrl){

          var fotoP='http://maxoptika-app.com/maxoptikaFTP/';
          // {{fotoUrl2 || 'SD12178_front.png'}}

          $scope.fotoUrl2=fotoP+$scope.syzetFront4[fotoUrl]+'.png';
          console.log('test foto');
          //$scope.apply();

        };

        $scope.provoVirtualKodi=window.localStorage.getItem('provoVirtualKod');
        if ($scope.provoVirtualKodi!=null) {
          console.log('inside');
          // The real code
          var imageFoto='http://maxoptika-app.com/maxoptikaFTP/'+$scope.provoVirtualKodi+"_front.png";
          //var imageFoto="img/tryon/SD12203_front.png";
          console.log(imageFoto);
          // $scope.shtoLart(imageFoto);
          $scope.fotoUrl2=imageFoto;
          window.localStorage.removeItem('provoVirtualKod');
        }

});







