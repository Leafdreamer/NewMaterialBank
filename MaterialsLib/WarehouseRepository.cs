using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialsLib
{
    public class WarehouseRepository
    {
        private List<Warehouse> warehouseList;
        private int nextWarID;

        public WarehouseRepository()
        {
            warehouseList = new List<Warehouse>();

            Warehouse w1 = new Warehouse(1, "Warehouse 1");
            Warehouse w2 = new Warehouse(2, "Warehouse 2");
            Warehouse w3 = new Warehouse(3, "Warehouse 3");

            warehouseList.Add(w1);
            warehouseList.Add(w2);
            warehouseList.Add(w3);

            nextWarID = 4;
        }

        public List<Warehouse> GetAllWarehouses()
        {
            return new List<Warehouse>(warehouseList);
        }

        public Warehouse? GetWarehouseById(int id)
        {
            return warehouseList.FirstOrDefault(x => x.Id == id);
        }

        public Warehouse AddWarehouse(Warehouse warehouse)
        {
            warehouse.Id = nextWarID;
            nextWarID++;

            warehouseList.Add(warehouse);
            return warehouse;
        }

        public Warehouse? DeleteWarehouse(int id)
        {
            Warehouse? tbd = GetWarehouseById(id);

            if (tbd != null)
                warehouseList.Remove(tbd);

            return tbd;
        }

        public Warehouse? UpdateWarehouse(int id, Warehouse warehouse)
        {
            Warehouse? tbu = GetWarehouseById(id);

            if (tbu != null)
            {
                tbu.Name = warehouse.Name;
            }

            return tbu;
        }
    }
}