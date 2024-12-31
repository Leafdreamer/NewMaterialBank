using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialsLib
{
    public class MaterialRepository
    {
        private List<Material> materialList;
        private int nextMatID;

        public MaterialRepository()
        {
            materialList = new List<Material>();

            User u1 = new User(1, "admin@email.com", "1234", true);

            Material m1 = new Material(1, 1, "Steel Bar", "Metal", 2, "Small, Thingy", "", u1);
            Material m2 = new Material(2, 1, "Steel Screw", "Metal", 8, "Test Description", "", u1);

            materialList.Add(m1);
            materialList.Add(m2);

            nextMatID = 3;
        }

        public List<Material> GetAllMaterials()
        {
            return new List<Material>(materialList);
        }

        public Material? GetMaterialById(int id)
        {
            return materialList.FirstOrDefault(x => x.Id == id);
        }

        public List<Material> GetMaterialsByWarehouse(int id)
        {
            List<Material> materials = new List<Material>();

            foreach(Material m in materialList)
            {
                if (m.WarehouseNo == id)
                {
                    materials.Add(m);
                }
            }

            return materials;
        }

        public Material AddMaterial(Material material)
        {
            material.ValidateName();
            material.ValidateType();
            material.ValidateAmount();

            material.Id = nextMatID;
            nextMatID++;

            materialList.Add(material);
            return material;
        }
        
        public Material? DeleteMaterial(int id)
        {
            Material? tbd = GetMaterialById(id);

            if (tbd != null)
                materialList.Remove(tbd);

            return tbd;
        }

        public Material? UpdateMaterial(int id, Material material)
        {
            Material? tbu = GetMaterialById(id);

            if (tbu != null)
            {
                tbu.WarehouseNo = material.WarehouseNo;
                tbu.Name = material.Name;
                tbu.Type = material.Type;
                tbu.Amount = material.Amount;
                tbu.Description = material.Description;
                tbu.PictureURL = material.PictureURL;
                tbu.UpdatedAt = material.UpdatedAt;
                tbu.Changelogs = material.Changelogs;
            }

            return tbu;
        }
    }
}
