using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class TipoCuerda
    {
        [DataMember] public int TipoCuerdaID { get; set; }
        [DataMember] public string Descripcion { get; set; }
    }
}
