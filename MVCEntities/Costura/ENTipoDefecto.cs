using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENTipoDefecto:EntidadBase
    {
        [DataMember] public int IdTipoDefecto { get; set; }
        [DataMember] public string TipoDefecto { get; set; }
        [DataMember] public string Codigo { get; set; }
    }
}
