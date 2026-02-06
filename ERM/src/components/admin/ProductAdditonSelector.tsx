import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { ProductAddition } from "../../pages/admin/ProductosPage";

interface Props {
  productId?: string;
  value: number[];
  onChange: (ids: number[]) => void;
}

const ProductAdditionsSelector = ({ productId, value, onChange }: Props) => {
  const [additions, setAdditions] = useState<ProductAddition[]>([]);

  useEffect(() => {
    api.get("/admin/ingredients").then((r) => setAdditions(r.data));
  }, []);

  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="grid gap-2">
      <Label>Adiciones disponibles</Label>

      <div className="space-y-2">
        {additions.map((a) => (
          <div key={a.id} className="flex items-center gap-2">
            <Checkbox
              checked={value.includes(a.id)}
              onCheckedChange={() => toggle(a.id)}
            />
            <span className="text-sm">
              {a.name}{" "}
              <span className="text-muted-foreground">
                (+${a.extraPrice?.toLocaleString()})
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAdditionsSelector;
