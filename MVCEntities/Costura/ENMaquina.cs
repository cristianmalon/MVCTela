using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENMaquina : EntidadBase
    {
        [DataMember] public int IdMaquina { get; set; }
        [DataMember] public string Maquina { get; set; }
        [DataMember] public int IdTipoMaquina { get; set; }
        [DataMember] public string Item { get; set; }
        [DataMember] public string CodigoSap{ get; set; }
        [DataMember] public string CentroCostos{ get; set; }
        [DataMember] public string Marca { get; set; }
        [DataMember] public string Modelo { get; set; }
        [DataMember] public string Serie { get; set; }
        [DataMember] public string Familia { get; set; }
        [DataMember] public string SubFamilia{ get; set; }
        [DataMember] public string CentroCostosArea { get; set; }
        [DataMember] public string CentroCostosAreaDesc{ get; set; }
        [DataMember] public int EstadoMaquina { get; set; }
        [DataMember] public string EstadoMaquinaDes { get; set; }
        [DataMember] public string TipoMaquina { get; set; }
        [DataMember] public string DetalleTipoMaquina { get; set; }

        [DataMember] public int? IdUbicacion { get; set; }
        [DataMember] public int? IdLinea { get; set; }
        [DataMember] public string TMIDDes { get; set; }
        [DataMember] public int? IdTmiB01 { get; set; }
        [DataMember] public int? IdTmiB02 { get; set; }

        [DataMember] public string Ubicacion { get; set; }
        [DataMember] public string Linea { get; set; }
    }
}