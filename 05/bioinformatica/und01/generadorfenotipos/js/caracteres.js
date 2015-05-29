var caracteres = [
	{
		nombre: "Forma del rostro",
		opciones: [
			{
				nombre: "Redondo",
				codigo: "AA"
			},
			{
				codigo: "Aa"
			},
			{
				nombre: "Cuadrado",
				codigo: "aa"	
			}
		],
		fn : function(index){
			var img = "base";
			switch (index){
				case 1:
					img += "A1";
					break;
				case 3:
					img += "A2";
					break;
				default:
					img += "A2";
			}
			return {
				"tipo": "img",
				"img": img+".png"
			}
		},
		Z: 1
	},
	{
		nombre: "Tamaño de la barbilla",
		opciones: [
			{
				nombre: "Muy prominente",
				codigo: "BB"	
			},
			{
				nombre: "Prominente",
				codigo: "Bb"	
			},
			{
				nombre: "Poco prominente",
				codigo: "bb"
			}
		]
	},
	{
		nombre: "Forma de la mandíbula",
		opciones: [
			{
				nombre: "Redondo",
				codigo: "CC"
			},
			{
				codigo: "Cc"	
			},
			{
				nombre: "Cuadrado",
				codigo: "cc"
			}
		]
	},
	{
		nombre: "Barbilla partida",
		opciones: [
			{
				nombre: "Presente",
				codigo: "DD",
			},
			{
				codigo: "Dd"	
			},
			{
				nombre: "Ausente",
				codigo: "dd"
			}
		]
	},
	{
		nombre: "Color de piel",
		seleccionado : 6,
		opciones: [
			{
				nombre: "Negro",
				codigo: "P1P1P1P1P1P1"
			},
			{
				nombre: "Marrón muy oscuro",
				codigo: "P1P1P1P1P1p1"
			},
			{
				nombre: "Marrón oscuro",
				codigo: "P1P1P1P1p1p1"
			},
			{
				nombre: "Medianamente marrón",
				codigo: "P1P1P1p1p1p1"
			},
			{
				nombre: "Marrón claro",
				codigo: "P1P1p1p1p1p1"
			},
			{
				nombre: "Ligeramente bronceado",
				codigo: "P1p1p1p1p1p1"
			},
			{
				nombre: "Blanco",
				codigo: "p1p1p1p1p1p1"
			}
		],
		fn : function(index){
			var color = "";
			switch(index){
				case 1: color = "rgba( 69, 40,   16, 1)"; break;
				case 2: color = "rgba(119, 75,   38, 1)"; break;
				case 3: color = "rgba(147, 101,  62, 1)"; break;
				case 4: color = "rgba(178, 122,  75, 1)"; break;
				case 5: color = "rgba(195, 147, 107, 1)"; break;
				case 6: color = "rgba(244, 210, 181, 1)"; break;
				case 7: color = "rgba(255, 250, 246, 1)"; break;
				
			}
			return {
				"tipo": "color",
				"color": color
			}
		},
		z:0
	},
	{
		nombre: "Color de cabello",
		seleccionado: 6,
		opciones: [
			{
				nombre: "Negro",
				codigo: "Q1Q1Q1Q1Q1Q1Q1Q1"
			},
			{
				nombre: "Marrón muy oscuro",
				codigo: "Q1Q1Q1Q1Q1Q1Q1q1"
			},
			{
				nombre: "Marrón oscuro",
				codigo: "Q1Q1Q1Q1Q1Q1q1q1"
			},
			{
				nombre: "Marrón",
				codigo: "Q1Q1Q1Q1Q1q1q1q1"
			},
			{
				nombre: "Ligeramente marrón",
				codigo: "Q1Q1Q1Q1q1q1q1q1"
			},
			{
				nombre: "Marrón mezclado con rubio",
				codigo: "Q1Q1Q1q1q1q1q1q1"
			},
			{
				nombre: "Ligeramente rubio",
				codigo: "Q1Q1q1q1q1q1q1q1"
			},
			{
				nombre: "Rubio",
				codigo: "Q1q1q1q1q1q1q1q1"
			},
			{
				nombre: "Blanco",
				codigo: "q1q1q1q1q1q1q1q1"
			}
		],
		fn: function(index){
			return {
				'tipo':'img',
				'img': "cabello"+index+".png"
			}
		}
	},
	{
		nombre: "Tintes rojizos en el cabello",
		opciones: [
			{
				nombre: "Tinte rojo oscuro",
				codigo: "L1L1"
			},
			{
				nombre: "Tinte rojo claro",
				codigo: "L1L2"
			},
			{
				nombre: "Sin ningún tinte rojo",
				codigo: "L2L2"
			}
		]
	},
	{
		nombre: "Tipo de cabello",
		seleccionado: 2,
		opciones: [
			{
				nombre: "Rizado",
				codigo: "M1M1"
			},
			{
				nombre: "Ondulado",
				codigo: "M1M2"
			},
			{
				nombre: "Lacio",
				codigo: "M2M2"
			}
		],
		fn : function (index){
			var rizado = "M1M1.png";
			var lacio = "M2M2.png";
			var ondulado = "M1M2.png";
			var cabello = "";
			
			switch (index){
				case 1: cabello = rizado; break;
				case 2: cabello = ondulado; break;
				case 3: cabello = lacio; break;
			}
			
			return {
				"tipo": "img",
				"img": cabello
			}
		}
	},
	{
		nombre: "Pico de viuda",
		opciones: [
			{
				nombre: "Presente",
				codigo: "OO"
			},
			{
				codigo: "Oo"
			},
			{
				nombre: "Ausente",
				codigo: "oo"
			}
		]
	},
	{
		nombre: "Color de ojos",
		opciones: [
			{
				nombre: "Negro",
				codigo: "PPQQ"
			},
			{
				nombre: "Marrón oscuro",
				codigo: "PPQq"
			},
			{
				nombre: "Marrón con tintes verdes",
				codigo: "PpQQ"
			},
			{
				nombre: "Marrón",
				codigo: "PpQq"
			},
			{
				nombre: "Violáceo",
				codigo: "PPqq"
			},
			{
				nombre: "Azul grisáceo",
				codigo: "Ppqq"
			},
			{
				nombre: "Verde",
				codigo: "ppQQ"
			},
			{
				nombre: "Azul Oscuro",
				codigo: "ppQq"
			},
			{
				nombre: "Azul claro",
				codigo: "ppqq"
			}
		],
		fn : function(index){
			var ojos = "ojos";
			return {
				tipo: "img",
				img: ojos+"1.png"
			};
		}
	},
	{
		nombre: "Distancia de ojos",
		opciones: [
			{
				nombre: "Cercanos",
				codigo: "R1R1"
			},
			{
				nombre: "Distancia promedio",
				codigo: "R1R2"	
			},
			{
				nombre: "Muy alejados",
				codigo: "R2R2"
			}
		]
	},
	{
		nombre: "Tamaño de ojos",
		opciones: [
			{
				nombre: "Grandes",
				codigo: "S1S1"
			},
			{
				nombre: "Medianos",
				codigo: "S1S2"
			},
			{
				nombre: "Pequeños",
				codigo: "S2S2"
			}
		]
	},
	{
		nombre: "Forma de los ojos",
		opciones: [
			{
				nombre: "Almendrados",
				codigo: "TT"
			},
			{
				codigo: "Tt"
			},
			{
				nombre: "Redondeados",
				codigo: "tt"
			}
		]
	},
	{
		nombre: "Disposición de los ojos",
		opciones: [
			{
				nombre: "Horizontales",
				codigo: "UU"
			},
			{
				codigo: "Uu"
			},
			{
				nombre: "Oblicuos",
				codigo: "uu"
			}
		]
	},
	{
		nombre: "Pestañas",
		opciones : [
			{
				nombre: "Largas",
				codigo: "VV"
			},
			{
				codigo: "Vv"
			},
			{
				nombre: "Cortas",
				codigo: "vv"
			}
		]
	},
	{
		nombre: "Color de cejas",
		opciones: [
			{
				nombre: "Más oscuro que el cabello",
				codigo: "W1W1"
			},
			{
				nombre: "Mismo color que el cabello",
				codigo: "W1W2"
			},
			{
				nombre: "Ligeramente más claro que el color del cabello",
				codigo: "W2W2"
			}
		],
		fn : function(index){
			var cejas = "cejas";
			return {
				tipo: "img",
				img: cejas+"1.png"
			};
		}
	},
	{
		nombre: "Grosor de cejas",
		opciones: [
			{
				nombre: "Cejas pobladas",
				codigo: "ZZ"
			},
			{
				codigo: "Zz"
			},
			{
				nombre: "Cejas finas",
				codigo: "zz"
			}
		]
	},
	{
		nombre: "Largo de las cejas",
		opciones: [
			{
				nombre: "No conectadas",
				codigo: "AA"
			},
			{
				codigo: "Aa"
			},
			{
				nombre: "Conectadas",
				codigo: "aa"
			}
		]
	},
	{
		nombre: "Tamaño de boca",
		opciones: [
			{
				nombre: "Grande",
				codigo: "B1B1"
			},
			{
				nombre: "Mediana",
				codigo: "B1B2"
			},
			{
				nombre: "Chica",
				codigo: "B2B2"
			}
		],
		fn : function(index){
			var boca = "boca";
			return {
				tipo: "img",
				img: boca+"1.png"
			};
		}
	},
	{
		nombre: "Grosor de labios",
		opciones: [
			{
				nombre: "Gruesos",
				codigo: "CC"
			},
			{
				codigo: "Cc"
			},
			{
				nombre: "Delgados",
				codigo: "cc"
			}
		]
	},
	{
		nombre: "Hoyuelos",
		opciones: [
			{
				nombre: "Presentes",
				codigo: "DD"
			},
			{
				codigo: "Dd"
			},
			{
				nombre: "Ausentes",
				codigo: "dd"
			}
		]
	},
	{
		nombre: "Tamaño de la nariz",
		opciones: [
			{
				nombre: "Grande",
				codigo: "E1E1"			
			},
			{
				nombre: "Mediana",
				codigo: "E1E2"
			},
			{
				nombre: "Pequeña",
				codigo: "E2E2"
			}
		],
		fn : function(index){
			var grande = "E1E1.png";
			var mediana = "E1E2.png";
			var pequena = "E2E2.png";
			var tamanio;
			switch(index){
				case 1: tamanio = grande; break;
				case 2: tamanio = mediana; break;
				case 3: tamanio = pequena; break;
			}
			return {
				tipo: "img",
				img: tamanio
			};
		}
	},
	{
		nombre: "Forma de la nariz",
		opciones: [
			{
				nombre: "Redonda",
				codigo: "FF"
			},
			{
				codigo: "Ff"
			},
			{
				nombre: "Puntiaguda",
				codigo: "ff"
			}
		]
	},
	{
		nombre: "Forma de los orificios nasales",
		opciones: [
			{
				nombre: "Redondo",
				codigo: "GG"
			},
			{
				codigo: "Gg"
			},
			{
				nombre: "Puntiagudo",
				codigo: "gg"
			}
		]
	},
	{
		nombre: "Fijación del lóbulo auricular",
		opciones: [
			{
				nombre: "Libre",
				codigo: "HH"
			},
			{
				codigo: "Hh"
			},
			{
				nombre: "Lóbulo unido",
				codigo: "hh"
			}
		]
	},
	{
		nombre: "Punto de Darwin en las orejas",
		opciones: [
			{
				nombre: "Presente",
				codigo: "II"
			},
			{
				codigo: "Ii"	
			},
			{
				nombre: "Ausente",
				codigo: "ii"
			}
		]
	},
	{
		nombre: "Vesículas en el oído",
		opciones: [
			{
				nombre: "Presente",
				codigo: "JJ"
			},
			{
				codigo: "Jj"	
			},
			{
				nombre: "Ausente",
				codigo: "jj"
			}
		]
	},
	{
		nombre: "Pelos en la oreja",
		opciones: [
			{
				nombre: "Presente",
				codigo: "KK"
			},
			{
				codigo: "Kk"	
			},
			{
				nombre: "Ausente",
				codigo: "kk"
			}
		]
	},
	{
		nombre: "Pecas en las mejillas",
		opciones: [
			{
				nombre: "Presente",
				codigo: "LL"
			},
			{
				codigo: "Ll"
			},
			{
				nombre: "Ausente",
				codigo: "ll"
			}
		]
	},
	{
		nombre: "Pecas en la frente",
		opciones: [
			{
				nombre: "Presente",
				codigo: "MM"
			},
			{
				codigo: "Mm"
			},
			{
				nombre: "Ausente",
				codigo: "mm"
			}
		]
	}
];