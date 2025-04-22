using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class Operario
    {
        [DataMember]
        public string Codigo { get; set; }
        [DataMember]
        public string Descripcion { get; set; }
        [DataMember]
        public string CodigoArea { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string Nombre { get; set; }
        [DataMember]
        public int TipoUsuario { get; set; }
    }
}
