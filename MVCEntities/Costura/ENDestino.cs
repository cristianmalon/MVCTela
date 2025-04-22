using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENDestino:EntidadBase
    {
        [DataMember] public int IdDestino { get; set; }
        [DataMember] public string Destino { get; set; }
    }
}
