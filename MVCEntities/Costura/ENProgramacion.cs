using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENProgramacion: EntidadBase
    {
        [DataMember] public int Id { get; set; }

        [DataMember] public string dcpctoc { get; set; }
        [DataMember] public string dcpnaop { get; set; }
        [DataMember] public string dcpnnop { get; set; }
        [DataMember] public int dcpncmbop { get; set; }
        [DataMember] public int OPCNItemD { get; set; }
        [DataMember] public string CodigoyDescripciondeComboCamtex { get; set; }
        [DataMember] public string ModulodeCortedeltendido { get; set; }
        [DataMember] public string OFCorte { get; set; }


        [DataMember] public string LineaProgramada { get; set; }
        [DataMember] public string Tallas { get; set; }
        [DataMember] public string TallasDesc { get; set; }
        [DataMember] public int QtyporTalla { get; set; }
        [DataMember] public int Total { get; set; }


        [DataMember] public string ComboCamtexCodigo { get; set; }
        [DataMember] public string ComboCamtex { get; set; }
        [DataMember] public string ComboPlanta { get; set; }
        [DataMember] public int IdProgramacionAsignacionLinea { get; set; }
        [DataMember] public int? IdProveedor { get; set; }
        [DataMember] public int? IdLinea { get; set; }

        [DataMember] public int PlantaServicio { get; set; }
        [DataMember] public int Orden { get; set; }
        [DataMember] public int? Orden2 { get; set; }
        [DataMember] public int TipoComboDcpo { get; set; }
        [DataMember] public string TipoComboDcpoDescripcion { get; set; }
        [DataMember] public int QtyPedido { get; set; }
        [DataMember] public int QtyHabilitado { get; set; }
        [DataMember] public int IdOPED02 { get; set; }

    }
}
