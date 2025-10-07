
 //referencia al formulario
        const form = document.getElementById("transactionForm");
        form.addEventListener("submit", function(event){
            //evento para evitar que se recargue el formulario
            event.preventDefault();
            //instancia de formdata metodo para guardar informacion del formulario
            let transactionFormData = new FormData(form)
            let transactionObj = convertFormDataToTransactionObj(transactionFormData)
            console.log(transactionObj)
            saveTransactionObj(transactionObj)
            insertRowInTransactionTable(transactionObj)
            form.reset();
        })

        document.addEventListener("DOMContentLoaded", function(event){
            let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
            transactionObjArr.forEach(function(arrayElement){
            insertRowInTransactionTable(arrayElement)
            })
        })
            
       
        function convertFormDataToTransactionObj(transactionFormData){
            let transactionType = transactionFormData.get("transactionType")
            let transactionDescription = transactionFormData.get("transactionDescription")
            let transactionAmount = transactionFormData.get("transactionAmount")
            let transactionCategory = transactionFormData.get("transactionCategory")
            let transactionId = getNewTransactionId()
            return{
                "transactionType": transactionType,
                "transactionDescription" : transactionDescription,
                "transactionAmount" : transactionAmount,
                "transactionCategory" : transactionCategory,
                "transactionId" : transactionId
            }
        }

       

        function insertRowInTransactionTable(transactionObj){
            //referencia para ubicar la tabla
            let transactionTableRef = document.getElementById("transactionTable");
            //referencia para insertar una fila en la tabla
            let newTransactionRowRef = transactionTableRef.insertRow(-1);

            newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"])


            //referencia para insertar las columnas de la ultima fila insertada
            let newTypeCellRef = newTransactionRowRef.insertCell(0);
            //texto columna 0
            newTypeCellRef.textContent = transactionObj["transactionType"]


            newTypeCellRef = newTransactionRowRef.insertCell(1);
            newTypeCellRef.textContent = transactionObj["transactionDescription"]

            newTypeCellRef = newTransactionRowRef.insertCell(2);
            newTypeCellRef.textContent = transactionObj["transactionAmount"]

            newTypeCellRef = newTransactionRowRef.insertCell(3);
            newTypeCellRef.textContent = transactionObj["transactionCategory"]
            
            let newDeleteCell = newTransactionRowRef.insertCell(4);
            let deleteButton = document.createElement("button")
            deleteButton.textContent = "Eliminar";
            newDeleteCell.appendChild(deleteButton)

            deleteButton.addEventListener("click", (event) =>{
                let transactionRow = event.target.parentNode.parentNode;
                let transactionId = transactionRow.getAttribute("data-transaction-id")
                console.log(transactionId)
                transactionRow.remove()
                deleteTransactionObj(transactionId)

            })
        }

         function getNewTransactionId(){
            let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
            let newTransactionId = JSON.parse(lastTransactionId) + 1;
            localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
            return newTransactionId
        }


         function deleteTransactionObj(transactionId){
            let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
            let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId)
            transactionObjArr.splice(transactionIndexInArray, 1)
            let transactionArrayJSON = JSON.stringify(transactionObjArr)
            //guardado en local
            localStorage.setItem("transactionData", transactionArrayJSON)
        }
        
        function saveTransactionObj (transactionObj){
            // intenta leer localStorage, si no existe, asigna []
            let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];

            myTransactionArray.push(transactionObj);

            // convierto mi array de transacciones a JSON
            let transactionArrayJSON = JSON.stringify(myTransactionArray);

            // guardo el JSON en localStorage
            localStorage.setItem("transactionData", transactionArrayJSON);
        }