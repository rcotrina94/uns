var data= [
  {name: 'mapa',                    weight:  9, value:150, pieces:1},
  {name: 'brújula',                weight: 13, value: 80, pieces:1},
  {name: 'agua',                  weight:153, value:200, pieces:1},
  {name: 'sandwich',               weight: 50, value: 60, pieces:1},
  {name: 'glucose',                weight: 15, value: 60, pieces:1},
  {name: 'botella',                    weight: 68, value: 45, pieces:1},
  {name: 'plátano',                 weight: 27, value: 60, pieces:1},
  {name: 'manzana',                  weight: 39, value: 40, pieces:1},
  {name: 'queso',                 weight: 23, value: 30, pieces:1},
  {name: 'gaseosa',                   weight: 52, value: 10, pieces:1},
  {name: 'cámara',          weight: 11, value: 70, pieces:1},
  {name: 'polo',                 weight: 32, value: 30, pieces:1},
  {name: 'shorts',                weight: 24, value: 15, pieces:1},
  {name: 'paraguas',               weight: 48, value: 10, pieces:1},
  {name: 'libreta',               weight: 73, value: 40, pieces:1},
  {name: 'waterproof, trousers',   weight: 42, value: 70, pieces:1},
  {name: 'waterproof, overclothes',weight: 43, value: 75, pieces:1},
  {name: 'note-case',              weight: 22, value: 80, pieces:1},
  {name: 'sunglasses',             weight:  7, value: 20, pieces:1},
  {name: 'towel',                  weight: 18, value: 12, pieces:1},
  {name: 'socks',                  weight:  4, value: 50, pieces:1},
  {name: 'book',                   weight: 30, value: 10, pieces:1}
];

function findBestPack() {
	var m= [[0]]; // maximum pack value found so far
	var b= [[0]]; // best combination found so far
	var opts= [0]; // item index for 0 of item 0 
	var P= [1]; // item encoding for 0 of item 0
	var choose= 0;
	for (var j= 0; j<data.length; j++) {
		opts[j+1]= opts[j]+data[j].pieces; // item index for 0 of item j+1
		P[j+1]= P[j]*(1+data[j].pieces); // item encoding for 0 of item j+1
	}
	for (var j= 0; j<opts[data.length]; j++) {
		m[0][j+1]= b[0][j+1]= 0; // best values and combos for empty pack: nothing
	}
	for (var w=1; w<=400; w++) {
		m[w]= [0];
		b[w]= [0];
		for (var j=0; j<data.length; j++) {
			var N= data[j].pieces; // how many of these can we have?
			var base= opts[j]; // what is the item index for 0 of these?
			for (var n= 1; n<=N; n++) {
				var W= n*data[j].weight; // how much do these items weigh?
				var s= w>=W ?1 :0; // can we carry this many?
				var v= s*n*data[j].value; // how much are they worth?
				var I= base+n; // what is the item number for this many?
				var wN= w-s*W; // how much other stuff can we be carrying?
				var C= n*P[j] + b[wN][base]; // encoded combination
				m[w][I]= Math.max(m[w][I-1], v+m[wN][base]); // best value
				choose= b[w][I]= m[w][I]>m[w][I-1] ?C :b[w][I-1];
			}
		}
	}
	var best= [];
	for (var j= data.length-1; j>=0; j--) {
		best[j]= Math.floor(choose/P[j]);
		choose-= best[j]*P[j];
	}
	var out='<table><tr><td><b>Count</b></td><td><b>Item</b></td><th>unit weight</th><th>unit value</th>';
	var wgt= 0;
	var val= 0;
	for (var i= 0; i<best.length; i++) {
		if (0==best[i]) continue;
		out+='</tr><tr><td>'+best[i]+'</td><td>'+data[i].name+'</td><td>'+data[i].weight+'</td><td>'+data[i].value+'</td>'
		wgt+= best[i]*data[i].weight;
		val+= best[i]*data[i].value;
	}
	out+= '</tr></table><br/>Total weight: '+wgt;
	out+= '<br/>Total value: '+val;
	document.body.innerHTML= out;
}
findBestPack();