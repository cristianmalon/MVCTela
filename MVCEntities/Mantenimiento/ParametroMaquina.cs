using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ParametroMaquina
    {

        [DataMember] public int IDPRMM02 { get; set; }
        [DataMember] public string Maquina { get; set; }
        [DataMember] public int ParametroId { get; set; }
        [DataMember] public int UnidadMedidaId { get; set; }
        [DataMember] public int TipoCuerdaID { get; set; }
        [DataMember] public string ProcesoCodigo { get; set; }
        [DataMember] public string TipoTenidoCodigo { get; set; }
        [DataMember] public int Marcado { get; set; }
        [DataMember] public int Obligatorio { get; set; }
        [DataMember] public int Orden { get; set; }

        [DataMember] public string TipoTenido { get; set; }
        [DataMember] public string Proceso { get; set; }
        [DataMember] public string Parametro { get; set; }
        [DataMember] public string UnidadMedida { get; set; }

        [DataMember] public int Rango { get; set; }
        [DataMember] public decimal RangoMin { get; set; }
        [DataMember] public decimal RangoMax { get; set; }

        [DataMember] public string Usuario { get; set; }
        [DataMember] public string Estacion { get; set; }
        [DataMember] public string MaquinaDestino { get; set; }

        /*
         	B.MaqCCod	,
	B.ParametroID	,
	A.UnidadMedidaId	,
	A.TipoCuerdaID,
	B.ProcesoCodigo	,
	B.TipoTenidoCodigo	,
	B.Marcado	,
	B.Obligatorio
         */
    }
}
