using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class E_HojaRutaControlDetalle
    {
        [DataMember] public int HRCDID { get; set; }
        [DataMember] public int HRCID { get; set; }
        [DataMember] public string HRCDDestino { get; set; }
        [DataMember] public string HRCDZona { get; set; }
        [DataMember] public string HRCDProducto { get; set; }
        [DataMember] public decimal? HRCDPesoIng { get; set; }
        [DataMember] public decimal? HRCDPesoRet { get; set; }
        [DataMember] public string HRCDHoraLlegada { get; set; }
        [DataMember] public string HRCDHoraSalida { get; set; }
        [DataMember] public decimal? HRCDKilometraje { get; set; }
        [DataMember] public string HRCDArea { get; set; }
        [DataMember] public string HRCDObservacion { get; set; }
    }
}
