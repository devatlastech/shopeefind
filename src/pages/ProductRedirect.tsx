import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductRedirect() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate(`/produto/${id}`, { replace: true });
    }
  }, [id, navigate]);

  return null;
}