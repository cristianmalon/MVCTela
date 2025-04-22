using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion.Entidades
{
    public class Response<T>
    {
        public T response { get; set; }
        public bool error { get; set; }
        public string mensaje { get; set; }
        public bool Success { get; set; } 
        public int TotalPage { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public Dictionary<string, object> ListaError { get; set; }
    }

    public class Response
    {
        public bool error { get; set; }
        public string mensaje { get; set; }
        public string output { get; set; }
        public string[] outputarray { get; set; }
        public bool Success { get; set; }
        public DataTable tabla { get; set; }
        public Dictionary<string, object> ListaError { get; set; }



        public string codigo { get; set; }
        public int status { get; set; }


    }
}
