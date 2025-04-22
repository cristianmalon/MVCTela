using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades.Base
{
    [DataContract]
    public class ELogWeb : EntidadBase
    {
        [DataMember] public int IdLog { get; set; }
        [DataMember] public int Id { get; set; }
        [DataMember] public string Estado { get; set; }

    }
}
