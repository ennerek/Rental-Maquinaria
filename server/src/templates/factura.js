

const factura = (machineries, total) => `

<div class="container" 
    
      style="
        width:100%;
        height:100%;
        background-color: #fbfbfb;
        padding: 30px 0;
    ">


        <h1 style="text-align: center ">Rental Maquinarias</h1>
        <h3 style="text-align: center ">Col. Tepeyac </h3>
        <h5 style="text-align: center ">Tel. 2252-6324, 2423-1694</h5>
        <h6 style="text-align: center ">www.rentalmaquinarias.com</h6>
        <h1></h1>
        <h4 style="text-align: center ">Factura</h4>
        <div class="container text-center">
            <table class="table table-bordered" style="
            width:30%;
            min-width: 500px;
            background-color: rgb(238, 238, 238);
            margin: 0 auto;
            text-align: center;
    ">
                <thead>
                  <tr>
                    <th class= "table-primary" scope="col">#</th>
                    <th class= "table-primary" scope="col">Nombre de la maquina</th>
                    <th class= "table-primary" scope="col">Total dias</th>
                    <th class= "table-primary" scope="col">Precio</th>
                    <th class= "table-primary" scope="col">Sub-total</th>
                  </tr>
                  </tr>
                </thead>
                <tbody>
                    ${machineries.map( (rentedMachinery, index) => 
                        `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${rentedMachinery.machinery.name}</td>
                            <td>${rentedMachinery.days}</td>
                            <td>${rentedMachinery.machinery.price}</td>
                            <td>${rentedMachinery.machinery.price * rentedMachinery.days}</td>
                        </tr>
                        `
                    )}
                </tbody>
              </table>
              <br>
              <div class="table-responsive" style="margin-left: 0%; margin-top: auto;">
              <table class="" style="
            width:30%;
            min-width: 500px;
            background-color: rgb(238, 238, 238);
            margin: 0 auto;
            text-align: center;
    ">
                
                <tbody>
                  <tr>
                    <th scope="row">Subtotal</th>
                    <td>${total}</td>
                  </tr>
                  <tr>
                    <th scope="row">Impuesto</th>
                    <td>0.15</td>
                  </tr>
                  <tr>
                    <th scope="row">Total a pagar</th>
                    <td>${total + (total*0.15)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
           <h1 style="margin: 10 auto; text-align: center;" >¡Gracias por preferirnos!</h1>
      </div>
`

module.exports = { factura }