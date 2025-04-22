using System.Runtime.Serialization;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENOrdenProduccion:EntidadBase
    {
        [DataMember] public string TipoOP { get; set; }
        [DataMember] public string TipoOPDescripcion { get; set; }
        [DataMember] public int AnioOP { get; set; }
        [DataMember] public string NroOP { get; set; }
        [DataMember] public string Cliente { get; set; }
        [DataMember] public string Marca { get; set; }
        [DataMember] public string EstiloCamtex { get; set; }
        [DataMember] public string SD { get; set; }
        [DataMember] public string DescripcionPrenda { get; set; }
        [DataMember] public string Ruta { get; set; }
        [DataMember] public string RutaReal { get; set; }

    }
}
