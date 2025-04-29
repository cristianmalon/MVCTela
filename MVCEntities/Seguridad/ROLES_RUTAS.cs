using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ROLES_RUTAS : EntidadBase
    {
        [DataMember]
        public Int64 ROLES_ID { get; set; }
        [DataMember]
        public Int64 RUTAS_ID { get; set; }
        [DataMember]
        public String DESCRIPCION_ROL { get; set; }
        [DataMember]
        public String DESCRIPCION_RUTA { get; set; }
        [DataMember]
        public String ROLESKey { get; set; }
        [DataMember]
        public String RUTASKey { get; set; }
        [DataMember]
        public List<RUTAS> ListaRutas { get; set; }
        [DataMember]
        public List<ROLES> ListaRoles { get; set; }

    }
}
