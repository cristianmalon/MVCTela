using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;


namespace CAMTEX.Entidades
{
    [DataContract]
    public class E_CDSD01: EntidadBase
    {
        
        //[DataMember] public string EmpCCod { get; set; }
        [DataMember] public int Anio { get; set; }
        [DataMember] public int IDCaptura { get; set; }
        [DataMember] public string CdsNSerieGuia { get; set; }
        [DataMember] public string CdsNGuia { get; set; }
        [DataMember] public string CdsCProv { get; set; }
        [DataMember] public string CdsCTSer { get; set; }
        [DataMember] public string CdsNASer { get; set; }
        [DataMember] public string CdsNNSer { get; set; }
        [DataMember] public DateTime CdsFFechaReg { get; set; }
        [DataMember] public DateTime CdsFFechaLog { get; set; }
        [DataMember] public string CdsHHoraLog { get; set; }
        [DataMember] public string CdsUUsuLog { get; set; }
        [DataMember] public string CdsWEstacionLog { get; set; }
        [DataMember] public string LGRCOCOsvCNume { get; set; }

        [DataMember] public string codBarra { get; set; }
        [DataMember] public string XML_Etiquetas { get; set; }
        [DataMember] public string cantBultosLeidos { get; set; }
        [DataMember] public string cantBultosPendientes { get; set; }
        [DataMember] public string cantPrendasLeidos { get; set; }
        [DataMember] public string cantPrendasPendientes { get; set; }
        [DataMember] public string IP { get; set; }
        [DataMember] public string Placa { get; set; }

        [DataMember] public string DGRNANO { get; set; }
        [DataMember] public string DGRNNRO { get; set; }
        [DataMember] public string DGRNITM { get; set; }
        [DataMember] public string Oservicio { get; set; }

        [DataMember] public string GuiDTrans { get; set; }
        [DataMember] public string GuiDPtoDes { get; set; }

        [DataMember] public string LGRGuicNume { get; set; }
        [DataMember] public string LGRCPROVEEDOR { get; set; }
        [DataMember] public string LGRDPROVEEDOR { get; set; }
        [DataMember] public string Bultos { get; set; }

        [DataMember] public DateTime? FechaInicio { get; set; }
        [DataMember] public DateTime? FechaFin { get; set; }
        [DataMember] public DateTime? LGRFFECEMI { get; set; }

    }
}
