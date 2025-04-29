using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENDefecto : EntidadBase
    {
        [DataMember] public int IdDefecto { get; set; }
        [DataMember] public int? IdTipoDefecto { get; set; }
        [DataMember] public string Defecto { get; set; }
        [DataMember] public string Codigo { get; set; }
    }
}
