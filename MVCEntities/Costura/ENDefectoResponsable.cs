using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENDefectoResponsable : EntidadBase
    {
        [DataMember] public int IdDefectoResponsable { get; set; }
        [DataMember] public int IdDefecto { get; set; } 
        [DataMember] public int? IdResponsableDefecto { get; set; }

        [DataMember] public string CodigoDefecto { get; set; }
        [DataMember] public string CodigoResponsable { get; set; }
        [DataMember] public string CodigoTipoDefecto { get; set; }
        [DataMember] public string Codigo { get; set; }

    }
}
