var app = angular.module('ConversionNumerica', []);

app.controller('MainController', function($scope){
	var BCD = "BCD", HEX = "HEX", DEC = "DEC", BIN = "BIN", OCT = "OCT" ;

	$scope.base = DEC;
	$scope.convertir_base = BIN;
	$scope.numero = "15";
	$scope.output = ""
	$scope.isSelected = function(str){
		return str == $scope.convertir_base;
	}
	$scope.cambiarBase = function(base){
		$scope.convertir_base = base;
	}

	var imprimir = function(str){
		$scope.output += " " + str;
	}
	var formatprint = function(){
		var args = [].slice.call(arguments);
		args.forEach(function(arg) {
			imprimir(arg)
		});
		$scope.output += "\n";
	}

	var reconocerBase = function(str){
		var base;
		var max = str.split("").sort().pop();
		if (max < 2){
			if (parseInt(str, 2) > 15){
				base = BIN;
			} else {
				base = BCD;
			}
			base =  2;
		} else if (max < 8){
			base =  OCT;
		} else if (max < 9){
			base =  DEC;
		} else {
			base =  HEX;
		}
		return base;
	}

	var numbase = function(nom_base){
		switch(nom_base){
			case BCD:
			case BIN:
				return 2;
			case HEX:
				return 16;
			case DEC:
				return 10;
			case OCT:
				return 8;
		}
	}

	var hex2bin = function(hex){
		return parseInt(hex, 16).toString(2);
	}

	var bin2hex = function(bin){
		return bin2dec(bin).toString(16).toUpperCase();
	}

	var bin2oct = function(bin){
		return parseInt(bin, 2).toString(8);
	}

	var bin2dec = function(bin){
		return parseInt(bin, 2);
	}

	var oct2bin = function(oct){
		return parseInt(oct, 8).toString(2);
	}

	var dec2bin = function(dec){
		return parseInt(dec).toString(2);
	}

	var BCDformat = function(str){
		return str.length<4?BCDformat("0"+str):str;
	}

	var dec2bcd = function(dec){
		var digits = dec.split("");
		var BCD = []
		digits.forEach(function(d){
			if (parseInt(d)!="0"){
				BCD.push(BCDformat(dec2bin(d)));
			}
		})
		return BCD.join(" ");
	}

	var BCDdeformat = function(bcd){
		return (bcd.length % 4 != 0)?BCDdeformat("0"+bcd):bcd;
	}

	var bcd2dec = function(bcd){
		if (bcd.length <= 4){
			return bin2dec(bcd);
		} else {
			bcd_digits = BCDdeformat(bcd.split(" ").join("")).match(/.{4}/g);;
			return bcd_digits.reduce(function(prev, curr){
				return "" + bin2dec(prev) + bin2dec(curr);
			});
		}

	}


	var convertir = function(num, base, nueva_base){
		num = num.replace(/^0+(?!\.|$)/, '');

		formatprint("Convertir", num, "("+ base +")", "a", nueva_base+":");

		if (base == BCD && parseInt(num, numbase(base)) > 15){
			formatprint(num, "no está en BCD.")
			return;
		}

		switch(nueva_base){
			case BCD:
				switch(base){
					case HEX:
						return convertir(hex2bin(num), BIN, BCD);
					case BIN:
						return convertir(bin2dec(num), DEC, BCD);
					case OCT:
						return convertir(oct2bin(num), BIN, BCD);
					case DEC:
						formatprint("=>", dec2bcd(num));
				}
				break;

			case DEC:
				switch(base){
					case HEX:
						return convertir(hex2bin(num), BIN, DEC);
					case OCT:
						return convertir(oct2bin(num), BIN, DEC);
					case BIN:
						return formatprint("=>", bin2dec(num));
					case BCD:
						return formatprint("=>", bcd2dec(num));
				}
				break;
			case BIN:
				switch(base){
					case HEX:
						formatprint("=>", hex2bin(num)); break;
					case OCT:
						formatprint("=>", oct2bin(num)); break;
					case DEC:
						formatprint("=>", dec2bin(num)); break;
					case BCD:
						return convertir(bcd2dec(num), DEC, BIN);
				}
				break;
			case OCT:
				switch(base){
					case HEX:
						return convertir(hex2bin(num), BIN, OCT);
					case BIN:
						formatprint("=>", bin2oct(num)); break;
					case DEC:
						return convertir(dec2bin(num), BIN, OCT);
					case BCD:
						return convertir(bin2dec(num), DEC, OCT);
				}
				break;
			case HEX:
				switch(base){
					case OCT:
						return convertir(oct2bin(num), BIN, HEX);
					case BIN:
						formatprint("=>", bin2hex(num));
						break;
					case DEC:
						return convertir(dec2bin(num), BIN, HEX);
					case BCD:
						return convertir(bin2dec(num), DEC, HEX);
				}
				break;
		}
	}
	$scope.convertir = function(){
		$scope.output = "";
		convertir($scope.numero, $scope.base, $scope.convertir_base);
	};

	$scope.limpiar = function(){
		$scope.output = "";
		$scope.numero = "";
	}
});



