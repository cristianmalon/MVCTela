using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class E_HojaRutacontrol: EntidadBase
    {
        [DataMember] public int HRCID { get; set; }
        [DataMember] public string HRCTraCCod { get; set; }
        [DataMember] public string HRCPlaca { get; set; }
        [DataMember] public string HRCLicencia { get; set; }
        [DataMember] public DateTime HRCFecha { get; set; }
        [DataMember] public decimal HRCCargaCombustible { get; set; }
        [DataMember] public decimal HRCQGLNS { get; set; }
        [DataMember] public decimal HRCCosto { get; set; }
        [DataMember] public decimal HRCQVueltas { get; set; }
        [DataMember] public decimal HRCKmInicial { get; set; }
        [DataMember] public string HRCHoraSalida { get; set; }
        [DataMember] public string HRCUUsuarioLog { get; set; }
        [DataMember] public string HRCWEstacionLog { get; set; }
        [DataMember] public string HRCHoraLog { get; set; }
        [DataMember] public DateTime HRCFFechalog { get; set; }
        [DataMember] public string HRCTransportista { get; set; }
        [DataMember] public string HRCMTC { get; set; }
        [DataMember] public string XML_HojaRutaControlDetalle { get; set; }
    }
}
