using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENResponsable : EntidadBase
    {
        [DataMember] public int IdResponsable { get; set; }
        [DataMember] public string Responsable { get; set; }
        [DataMember] public string Codigo { get; set; }
    }
}
