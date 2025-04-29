using CAMTEX.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCBase.Models
{
    public class MOperario
    {
        public Operario Operario { get; set; }
        public string Password { get; set; }
        public bool IsSupervisor { get; set; }
        public bool IsAdmin { get; set; }
        public int IndexCboArea { get; set; }
    }
}