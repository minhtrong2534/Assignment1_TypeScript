angular
    .module('myapp', ['ngRoute'])
    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $rootScope.loading = false;
            }, 200);
        });
        $rootScope.$on('$routeChangeError', function () {
            $rootScope.loading = false;
            alert('Lỗi rồi mấy cưng');
        })
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/Trangchu.html',
                controller: 'homeCtrl',

            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'about'
            })
            .when('/tintuc', {
                templateUrl: 'views/tincongnghe.html',
            })
            .when('/tinkhuyenmai', {
                templateUrl: 'views/tintuc.html',
                controller: 'tintucCtrl'
            })
            .when('/detail/:id', {
                templateUrl: 'views/chitietsanpham.html',
                controller: 'detailCtrl'
            })
            .when('/cart', {
                templateUrl: 'views/giohang.html',
                controller: 'cartCtrl'
            })
            .when('/sanpham', {
                templateUrl: 'views/Sanpham.html',
                controller: 'sanphamctrl'
            })
            .when('/dangnhap', {
                templateUrl: 'views/dangnhap.html',
                controller: 'dangnhapctrl'
            })
            .when('/dangky', {
                templateUrl: 'views/dangky.html',
                controller: 'dangkyctrl'
            })
            .when('/doimatkhau', {
                templateUrl: 'views/doimatkhau.html',
                controller: 'doimatkhauctrl'
            })
            .otherwise({
                redirectTo: '/home'
            })
    })
    .controller('cartCtrl', function ($rootScope, $scope) {
        $scope.tongTien = function(){
            var tong=0;
            for(let i=0; i<$rootScope.cart.length;i++){
                tong+=$rootScope.cart[i].quantity*$rootScope.cart[i].price2;
            }
            return tong;
        }
        $scope.removeitem=function(id){
            for(var i=0; i<$rootScope.cart.length; i++){
            if($rootScope.cart[i].id==id){
            $rootScope.cart.splice(i,1);
            }
        }
        }
        $scope.removeallitem = function(){
            $rootScope.cart = [];
        }
    })
    
    .controller('detailCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.sp = {};
        for (const sp of $scope.dsSP) { //tìm sp có id trong dssp
            if (sp.id == $scope.id) {
                $scope.sp = sp;
                break;
            }
        }
    })
    .controller('myctrl', function ($scope, $http, $rootScope) {
        $scope.dsSP = [];
        $http.get('data.json').then(
            function (res) {
                $scope.dsSP = res.data;
            },
            function (res) {
                alert('Lỗi Rồi! OH NO');
            }
        );
        $rootScope.cart = [];
        $rootScope.addtoCart = function (sp) {
            var inCart = false;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    $rootScope.cart[i].quantity++;
                    inCart = true;
                    break;
                }
            }
            // sp chưa có trong cart -> thêm vào cart
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);
            }
        }
        $scope.dsSP = $scope.dsSP;
        $scope.pc = $scope.dsSP.filter(function(sp) {
            return product.type === 'PC';
        });

        $scope.laptop = $scope.dsSP.filter(function(sp) {
            return sp.type === 'Laptop';
        });
        $scope.showProducts = false;
        $scope.showAllProducts = function() {
            $scope.showProducts = true;
        };
        $scope.filterByType = function (type) {
            $scope.dsSP = $scope.dsSP.filter(function (sp) {
                return sp.type === type;
            });
        };
        $scope.showAllProducts();
    })
    .controller('homeCtrl', function ($scope, $interval, $rootScope, $http) {
        $scope.infor = 'Hello everybody!';
        $interval(function () {

            $scope.now = new Date();
        }, 1000);
    })
    .controller('aboutCtrl', function ($scope) {
        this.infor = 'Chào mấy cưng'
    })
    .controller('tintucCtrl', function ($scope,$http) {
        $http.get('data1.json').then(
            function (response) {
                $scope.dsSP = response.data;
            },
            function (response) {
                alert('Lỗi Rồi! OH NO');
            }
        );
        $scope.page = 1;
        $scope.limit = 4;
        $scope.start = $scope.limit * ($scope.page - 1);
        $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);
        $scope.chuyenTrang = function (trang) {
            $scope.page = trang;
            $scope.start = $scope.limit * ($scope.page - 1);
        }
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.totalPage; i++) {
            $scope.dsTrang.push(i);
        }

    })
    .controller('sanphamctrl', function ($scope) {
        $scope.page = 1;
        $scope.limit = 8;
        $scope.start = $scope.limit * ($scope.page - 1);
        $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);
        $scope.chuyenTrang = function (trang) {
            $scope.page = trang;
            $scope.start = $scope.limit * ($scope.page - 1);
        }
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.totalPage; i++) {
            $scope.dsTrang.push(i);
        }
        
    })
    .controller('dangkyctrl', function($scope, $window) {
        $scope.users = [];
            $scope.submitForm = function() {
                var newUser = {
                    username: $scope.user.username,
                    email:$scope.user.email,
                    password: $scope.user.password
                };

                $scope.users.push(newUser);
                alert('Đăng ký thành công!');
                console.log($scope.users); 
                $scope.user = {};
            };
        $scope.chuyenweb = function(url) {
            $window.location.href = url;
        };
    })
    .controller('dangnhapctrl', function($scope, $window) {
        $scope.doiweb = function(url) {
            $window.location.href = url;
        };
    })
    .controller('doimatkhauctrl', function($scope,$window) {
    
        $scope.changePassword = function() {
            if ($scope.users.newPassword !== $scope.users.confirmPassword) {
                alert("Xác nhận mật khẩu mới không khớp!");
                return;
            }else{
                alert("Đổi mật khẩu thành công!")
            }
            console.log($scope.users);
        };
        $scope.web = function(url) {
            $window.location.href = url;
        };
    });
    


