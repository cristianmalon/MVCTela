using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;


namespace CAMTEX.Entidades
{
    [DataContract]
    public class E_CDSD02
    {
        [DataMember] public string EmpCCod { get; set; }
        [DataMember] public int Anio { get; set; }
        [DataMember] public int IDCaptura { get; set; }
        [DataMember] public int IDItem { get; set; }
        [DataMember] public decimal CdsNBultos { get; set; }
        [DataMember] public decimal CdsNQPdas { get; set; }
        [DataMember] public string CdsCColor { get; set; }
        [DataMember] public string CdsCTCorte { get; set; }
        [DataMember] public decimal CdsNACorte { get; set; }
        [DataMember] public decimal CdsNCorte { get; set; }
        [DataMember] public string CdsCTPedido { get; set; }
        [DataMember] public decimal CdsNAPedido { get; set; }
        [DataMember] public string CdsNPedido { get; set; }
        [DataMember] public string CdsSLectura { get; set; }
        [DataMember] public string CdsFFechaLog2 { get; set; }
        [DataMember] public string CdsHHoraLog2 { get; set; }
        [DataMember] public string CdsUUsuarioLog2 { get; set; }
        [DataMember] public string CdsWEstacionLog2 { get; set; }

        [DataMember] public int LGRNIBOLSA { get; set; }
        [DataMember] public string LGRDIBOLSA { get; set; }
        [DataMember] public string LGRSLECTURA { get; set; }

        [DataMember] public string CodBarra { get; set; }
        [DataMember] public string CodBarra1 { get; set; }
        [DataMember] public string color { get; set; }
        [DataMember] public string CantidadPrendas { get; set; }
        [DataMember] public string OFCorte { get; set; }
        [DataMember] public string Pedido { get; set; }
        [DataMember] public string LGRCOCOsvCNume { get; set; }

        [DataMember] public string LGRGuicNume { get; set; }
        [DataMember] public string LGRSLECEnt { get; set; }
    }
}
