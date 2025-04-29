using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    public class ENEmpresa : EntidadBase
    {
        [DataMember] public int IdEmpresa { get; set; }
        [DataMember] public string Empresa { get; set; }
    }
}
