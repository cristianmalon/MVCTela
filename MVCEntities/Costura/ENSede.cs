using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENSede : EntidadBase
    {
        [DataMember] public int IdSede { get; set; }
        [DataMember] public int IdEmpresa { get; set; }
        [DataMember] public string Sede { get; set; }

    }
}
