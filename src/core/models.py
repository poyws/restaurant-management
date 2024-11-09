from sqlalchemy import Column, String, Float, Boolean, Enum
from sqlalchemy.orm import relationship
from core.models import BaseModel
import enum

class CategoriaProduto(enum.Enum):
    ENTRADA = 'entrada'
    PRATO_PRINCIPAL = 'prato_principal'
    SOBREMESA = 'sobremesa'
    BEBIDA = 'bebida'

class Produto(BaseModel):
    __tablename__ = 'produtos'
    
    nome = Column(String(100), nullable=False)
    descricao = Column(String(255))
    preco = Column(Float, nullable=False)
    categoria = Column(Enum(CategoriaProduto), nullable=False)
    disponivel = Column(Boolean, default=True)
    imagem_url = Column(String(255))
