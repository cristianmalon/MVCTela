using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class EntidadEstado
    {
        public EntidadEstado(String CODIGO, String DESCRIPCION)
        {
            this.CODIGO = CODIGO;
            this.DESCRIPCION = DESCRIPCION;
        }
        public EntidadEstado()
        {
            this.CODIGO = CODIGO;
            this.DESCRIPCION = DESCRIPCION;
        }
        [DataMember]
        public String CODIGO { get; set; }
        [DataMember]
        public String DESCRIPCION { get; set; }
    }

}

