
//-------------------------Hallando el Inicio Próximo ------------------------------------------  
var $scope = {};
var total = $scope.actividades.length;
angular.forEach($scope.actividades, function(actividad, indice){
    if (actividad.precedencia.length){
        actividad.inicio_proximo = 0;
    } else {   
        actividad.inicio_proximo = actividad.precedencia.map(function(actividad){ return actividad.duracion; }).max();
    }
})
//var IP = [];
//
//for (var i = 0; i < total; i++) {
//    if ($scope.actividades[i].precedencia.equals("-")) {
//        IP[i] = 0;
//    } else {
//        var maximo;
//        var precede = $scope.actividades[i].precedencia;
//        for (var j = 0; j < precede.length; j++) {
//            if (Precede[j].equals("-")) {
//                Maximo[j] = 0;
//            } else {
//                for (var k = 0; k < total; k++) {
//                    if (Actividad[k].equalsIgnoreCase(Precede[j])) {
//                        maximo = Integer.parseInt (Tiempo[k]);
//                        Maximo[j] = maximo + IP[k];
//                    }
//                }
//            }
//            var aux1 = 0;
//            for (var k = 0; k < precede.length(); k++) {
//                for (var l = 0; l < precede.length() - 1; l++) {
//                    if (Maximo[l] < Maximo[l + 1]) {
//                        aux1 = Maximo[l];
//                        Maximo[l] = Maximo[l + 1];
//                        Maximo[l + 1] = aux1;
//                    }
//                }
//            }
//        }
//        IP[i] = Maximo[0];
//    }
}

//-------------------------Hallando el Final Lejano------------------------------------------        
var FL[] = new var[total];
var HallandoFL[] = new var[total];
for (var i = 0; i < total; i++) {
    HallandoFL[i] = IP[i] + vareger.parsevar(Tiempo[i]);
}
var aux = 0;
for (var k = 0; k < total; k++) {
    for (var l = 0; l < total - 1; l++) {
        if (HallandoFL[l] < HallandoFL[l + 1]) {
            aux = HallandoFL[l];
            HallandoFL[l] = HallandoFL[l + 1];
            HallandoFL[l + 1] = aux;
        }
    }
}
FL[total - 1] = HallandoFL[0]; //- vareger.parsevar(Tiempo[total - 1]);
System.out.prvarln(FL[total - 1]);
for (var i = total - 2; i >= 0; i--) {
    var minimo = 0;
    var contador = 0;
    var Minimo[] = new var[27];
    for (var j = 0; j < 27; j++) {
        Minimo[j] = 999;
    }
    for (var j = i + 1; j < total; j++) {
        String precede;
        precede = Precedencia[j];
        String Precede[] = new String[precede.length()];
        for (var k = 0; k < precede.length(); k++) {
            Precede[k] = String.valueOf(precede.charAt(k));
        }
        for (var k = 0; k < precede.length(); k++) {
            if (Precede[k].equalsIgnoreCase(Actividad[i])) {
                contador++;
                Minimo[contador] = FL[j] - vareger.parsevar(Tiempo[j]);
            }
        }
    }
    if (contador == 0) {
        Minimo[0] = FL[total - 1];
    }
    var aux1 = 0;
    for (var k = 0; k < total; k++) {
        for (var l = 0; l < total - 1; l++) {
            if (Minimo[l] < Minimo[l + 1]) {
                aux1 = Minimo[l];
                Minimo[l] = Minimo[l + 1];
                Minimo[l + 1] = aux1;
            }
        }
    }
    FL[i] = Minimo[total - 1];
}
//---------------------------------HALLANDO EL INICIO LEJANO Y EL FINAL PROXIMO--------------------------------------------
var IL[] = new var[total];
var FP[] = new var[total];
var MT1[] = new var[total];
var MT2[] = new var[total];
String Criticidad[] = new String[total];
for (var i = 0; i < total; i++) {
    IL[i] = FL[i] - vareger.parsevar(Tiempo[i]);
    FP[i] = IP[i] + vareger.parsevar(Tiempo[i]);
    MT1[i] = FL[i] - FP[i];
    MT2[i] = IL[i] - IP[i];
    if (MT1[i] == MT2[i] && MT1[i] == 0) {
        Criticidad[i] = "C";
    } else {
        Criticidad[i] = "NC";
    }
}
System.out.prvarln();
for (var i = 0; i < total; i++) {
    System.out.prvarln(Actividad[i] + "\t" + $scope.actividades[i].precedencia + "\t" + Tiempo[i] + "\t" + IP[i] + "\t" + IL[i] + "\t" + FP[i] + "\t" + FL[i] + "\t" + MT2[i] + "\t" + Criticidad[i]);
}
Object TS[][] = new Object[total][8];
Object Aux[] = new Object[8];
for (var i = 0; i < total; i++) {
    for (var j = 0; j < 8; j++) {
        if (j == 0) {
            TS[i][j] = Actividad[i];
        } else if (j == 1) {
            TS[i][j] = Tiempo[i];
        } else if (j == 2) {
            TS[i][j] = IP[i];
        } else if (j == 3) {
            TS[i][j] = IL[i];
        } else if (j == 4) {
            TS[i][j] = FP[i];
        } else if (j == 5) {
            TS[i][j] = FL[i];
        } else if (j == 6) {
            TS[i][j] = MT2[i];
        } else if (j == 7) {
            TS[i][j] = Criticidad[i];
        }
    }
}
borrar();
//jTable2.setModel(new DefaultTableModel());
DefaultTableModel Tabla = (DefaultTableModel) Proyecto.jTable2.getModel();
for (var c = 0; c < total; c++) {
    for (var j = 0; j < 8; j++) {
        Aux[j] = TS[c][j];
    }
    Tabla.addRow(Aux);
}
}