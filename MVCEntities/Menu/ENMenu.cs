using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCEntities.Menu
{
    public class ENMenu
    {
        public int IdMenu { get; set; }
        public int TipoMenu { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Icon { get; set; }
        public string Controler { get; set; }
        public string Action { get; set; }        
        public int IdEstado { get; set; }
        public List<ENMenu> Hijos { get; set; }
        public List<ENOpcion> Opciones { get; set; }
    }

    public class ENOpcion
    {
        public int IdOpcion { get; set; }
        public int Opcion { get; set; }
        public int IdEstado { get; set; }
    }

}
