from pydantic import BaseSettings

class Configuracoes(BaseSettings):
    # Configurações do banco de dados
    DATABASE_URL: str = "postgresql://usuario:senha@localhost/restaurante_db"
    
    # Configurações de segurança
    SECRET_KEY: str = "KEY_SECRET"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Configurações de ambiente
    DEBUG: bool = False
    AMBIENTE: str = "desenvolvimento"
    
    # Configurações de email
    EMAIL_HOST: str = "smtp.gmail.com"
    EMAIL_PORTA: int = 587
    EMAIL_USUARIO: str = "seu_email@gmail.com"
    EMAIL_SENHA: str = "sua_senha"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Instância global de configurações
config = Configuracoes()
