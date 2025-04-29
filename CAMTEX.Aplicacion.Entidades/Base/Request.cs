using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion.Entidades
{
    public class Request<T>
    {
        public T entidad { get; set; }
        public string token { get; set; }
    }
}
