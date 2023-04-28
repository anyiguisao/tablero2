class Excel{
    constructor(content){
        this.content= content
    }

    header(){
        return this.content[0]
    }
    rows(){
        return new RowCollection(this.content.slice(1,this.content.length))
    }

}

class RowCollection{
    constructor(rows){
        this.rows= rows
    }
    first(){
        return new Row(this.rows[0])
        //nos puede entregar el primer elemento
    }

    get(index){
        return new Row(this.rows[index])
        //no puede entregar todo el arreglo de fila
    }

    count(){
        return this.rows.length
        //cuenta todos los elementos
    }
}

class Row{

    constructor (row){
        this.row = row
    }

    name(){
        return this.row[0]
    }
    
    apellido(){
        return this.row[1]
    }

    ciudad(){
        return this.row[2]
    }

    edad(){
        return this.row[3]
    }
    image(){
        return this.row[4]
    }
    todo(){
        return this.row[5]
    }
     
    
    // aqui podemos encapsular la logica con la infomacion pricipal de la tabla
    //por si el sistema crece poder tener una mejor lectutra del codigo y poder
    // trabaja la logica a la clase que le opertenece

}

class ExcelPrinter{
    static print(tableId,excel){
    
        const table= document.getElementById(tableId)

        excel.header().forEach(title=>{
            table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
        })
        for (let index = 0; index < excel.rows().count(); index++) {
            const row = excel.rows().get(index)

            table.querySelector('tbody').innerHTML += `
            <tr>
                <td>${row.name()}</td>
                <td>${row.apellido()}</td>
                <td>${row.ciudad()}</td>
                <td>${row.edad()}</td>
                <td>${row.todo()}</td>
            </tr>
            <img`
            
        }

    }
}

const excelInput= document.getElementById('excel-input')

excelInput.addEventListener('change',async function(){
    const content= await readXlsxFile(excelInput.files[0])

    const excel= new Excel(content)

    console.log(excel.rows().get(0).image())
    
    console.log(ExcelPrinter.print('excel-table',excel))
})