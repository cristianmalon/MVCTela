using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class Parametro
    {
        [DataMember] public int ParametroId { get; set; }
        [DataMember] public string ParametroCodigo { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public string Codigo { get; set; }

        [DataMember] public string EmpCCod { get; set; }
        [DataMember] public string OFaCTDc { get; set; }
        [DataMember] public int OFaNAno { get; set; }
        [DataMember] public string OFaNNro { get; set; }

        [DataMember] public string MaqCCod { get; set; }
        [DataMember] public string TipoTenidoCodigo { get; set; }
        [DataMember] public string ProcesoCodigo { get; set; }
        [DataMember] public int Obligatorio { get; set; }
        [DataMember] public int Rango { get; set; }
        [DataMember] public decimal RangoMin { get; set; }
        [DataMember] public decimal RangoMax { get; set; }
        [DataMember] public int UnidadMedidaID { get; set; }
        [DataMember] public string UnidadMedida { get; set; }

        [DataMember] public int TipoCuerdaID { get; set; }
        [DataMember] public decimal Valor { get; set; }

        [DataMember] public string Sticker { get; set; }
        [DataMember] public decimal Peso { get; set; }
        [DataMember] public int ValidacionID { get; set; }
    }
}
