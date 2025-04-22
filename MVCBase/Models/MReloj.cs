using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCBase.Models
{
    public class MReloj
    {
        public int Hora { get; set; }
        public int Minuto { get; set; }
        public int Segundo { get; set; }
        public DateTime? FechaProceso { get; set; }

        public string Tiempo
        {
            get
            {
                return Hora.ToString().PadLeft(2, '0') + " : " + Minuto.ToString().PadLeft(2, '0') + " : " + Segundo.ToString().PadLeft(2, '0');
            }
        }

        public MReloj()
        {
            Hora = 0;
            Minuto = 0;
            Segundo = 0;
            FechaProceso = DateTime.Now;
        }

    }
}