using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class USUARIO_ROLES : EntidadBase
    {
        [DataMember]
        public Int64 USUARIO_ID { get; set; }
        [DataMember]
        public Int64 ROLES_ID { get; set; }
        [DataMember]
        public String MUSUCONST { get; set; }
        [DataMember]
        public String DESCRIPCION_USUARIO { get; set; }
        [DataMember]
        public String DESCRIPCION_ROL { get; set; }
        [DataMember]
        public String USUARIOKey { get; set; }
        [DataMember]
        public String ROLESKey { get; set; }
        [DataMember]
        public Int64 SISTEMA_ID { get; set; }
        [DataMember]
        public List<USUARIO> ListaUsuarios { get; set; }
        [DataMember]
        public List<ROLES> ListaRoles { get; set; }
        [DataMember]
        public String SISTEMAKey { get; set; }
        [DataMember]
        public bool EstadoUser { get; set; } 
        [DataMember]
        public String DesSistema { get; set; }
        
    }
}
