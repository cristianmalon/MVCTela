using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ConfigParametros: EntidadBase
    {
        public string MaqCCod { get; set; }
        public string ConfigUM { get; set; }
        public string ConfigCeldas { get; set; }

        public List<ProcesoTenido> ListProcesoTenido { get; set; }
        public List<TipoTenido> ListTipoTenido { get; set; }
        public List<TipoTenidoProceso> ListTipoTenidoProceso { get; set; }
        public List<Parametro> ListParametro { get; set; }

        public List<UnidadMedida> ListUnidadMedida { get; set; }

        public List<TipoCuerda> ListTipoCuerda { get; set; }
        public List<ParametroMaquina> ListaParametroMaquina { get; set; }
       // public List<Maquina> ListaMaquina { get; set; }


    }
}
