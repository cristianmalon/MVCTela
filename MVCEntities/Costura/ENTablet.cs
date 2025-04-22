using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENTablet : EntidadBase
    {
        [DataMember] public int IdTablet { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public int IdTipoMaquina { get; set; }
        [DataMember] public string CodigoSap { get; set; }
        [DataMember] public string Marca { get; set; }
        [DataMember] public string Modelo { get; set; }
        [DataMember] public string Serie { get; set; }
        //[DataMember] public int Estado { get; set; }
        [DataMember] public string TipoMaquina { get; set; }
        [DataMember] public string IPTablet { get; set; }
        [DataMember] public int IdMaquina { get; set; }
        [DataMember] public string Maquina { get; set; }
        [DataMember] public string TMICCod { get; set; }
        [DataMember] public int IdParada { get; set; }
        [DataMember] public int IdLinea { get; set; }
        [DataMember] public string Linea { get; set; }
        [DataMember] public string RpmCTipFalla { get; set; }
        [DataMember] public string Supervisor { get; set; }

    }
}
