---
title: Por que os drivers da nvidia dão problema quando o secure boot está ligado?
---

Desde que montei meu primeiro computador com placa de vídeo dedicada da nvidia, logo de cara me deparei com o problema que todo mundo que tem uma placa da nvidia e usa linux passa: Problema do driver quando o secure boot ativo. 

## Por que a NVIDIA pode dar trabalho no Linux?

Desde então eu me pergunto, por que raios a NVIDIA tem esse problema no linux?

Pelas minhas pesquisas (e por um belo resumo do chatGPT), o linux precisa de um driver para converar com a placa de vídeo, parte  desse driver funciona como um módulo kernel: um componente que pode ser carregado no kernel para dar suporte ao hardware sem precisar recompilar o kernel inteiro.

Pelo o que entendi, não é toda placa da NVIDIA que necessariamente tenha problemas no linux. O problema surge de uma combinação entre kernel, versão do driver, forma de instalação e políticas de segurança do sistema.

## E o secure boot? o que ele tem a ver com isso? O que é secure boot?

O secure boot é uma proteção do firmware UEFI. Ele ajuda a impedir que códigos não confiáveis participem da inicialização do computador. Ou seja, se alguém mal intensionado adicionar scripts que atuam na inicialização do sistema, o secure boot pode barrar.

Em alguns sistemas operacionais como o ubuntu, na inicialização do kernel (sob as políticas do secure boot), também verifica a assinatura de módulos carregáveis. Ou seja, se ele entender que a assinatura do módulo dos drivers da nvidia não for confiável, ele não carrega. 

Então, o secure boot não barra os drivers da nvidia simplesmete porque são da nvidia. Na verdade, pode acontecer com qualquer placa (ou hardware do seu pc). O secure boot bloqueia módulos cuja a assinatura não é confiável.

## Ok, mas como corrigir isso?

A primeira e mais simples resposta é: Desliga o secure boot e usa os drivers open da nvidia.

"Mas eu não quero e nem posso desligar o secure boot, qual outra alternativa?". : `chave MOK`.

## O que é a chave MOK?

Resumidamente, MOK (Machine Owner Key) é uma forma de nós (os donos dos computers) autorizar uma chave adicional para que o sistema reconheça os módulos assinados com ela. O famoso CONFIA.

## O que é NVIDIA-OPEN?

Algumas placas da nvidia são compativeis com os módulos open. Módulos open são modulos do kernel cujo código-fonte a nvidia publica sob licenças abertas. Mesmo usando esses módulos open, o sistema ainda pode requesitar uma assinatura válida. Para esses casos, ainda seria necessário desativar o secure boot.

Se você quer utilizar as principais versões do drivers e manter o secure boot habilitado, a melhor opção é criar uma chave MOK.

# Alguns comandos interessantes

## 1. Verificar se o secure boot está ativo
```
mokutil --sb-state
```

Se o comando não existir, no Ubuntu posso instalar a ferramenta com `sudo apt install mokutil`

## 2. Ver qua GPU e versão do driver estão em uso

```
nvidia-smi
```

Para uma saída mais curta:

```bash
nvidia-smi --query-gpu=driver_version,name --format=csv
```

## 3. Ver quais versões o ubuntu oferece

```bash
ubuntu-drivers devices
ubuntu-drivers list
```

## 4. Atualizar pacotes e a versão instalada do driver

```bash
sudo apt update
sudo apt upgrade
```

Isso atualiza os pacotes disponíveis, inclusive revisões do driver da série instalada, quando fornecidas pelo repositório.

## 5. Instalar o driver recomendado pelo Ubuntu

```bash
sudo ubuntu-drivers install --recommended
```

Para solicitar uma série específica, **caso esteja disponível**:

```bash
sudo ubuntu-drivers install nvidia:595
```

## 6. Reiniciar e confirmar o driver

```bash
sudo reboot
```

Depois da inicialização:

```bash
nvidia-smi
```

## 7. Descobrir se o módulo carregado é open ou proprietário

```bash
cat /proc/driver/nvidia/version
```

Se aparecer `NVIDIA UNIX Open Kernel Module`, estou usando a variante *open*. Se aparecer `NVIDIA UNIX x86_64 Kernel Module`, é a variante proprietária.

Outra forma de verificar o módulo disponível:

```bash
modinfo -F license nvidia
```

Geralmente, `Dual MIT/GPL` indica a variante *open* e `NVIDIA` indica a proprietária.

## 8. Verificar a assinatura do módulo

```bash
modinfo -F signer nvidia
```

Esse comando mostra quem assinou o módulo **instalado no disco**, quando há informação de assinatura. Ver uma assinatura não garante, por si só, que a chave seja aceita pelo kernel; ela também precisa ser confiável.

## 9. Verificar o DRM modesetting para o Wayland/Hyprland

```bash
cat /sys/module/nvidia_drm/parameters/modeset
```

`Y` significa que o DRM modesetting do módulo NVIDIA está habilitado. **Isso não verifica o Secure Boot.** É uma configuração relevante para o funcionamento gráfico no Wayland.

## 10. Investigar se o kernel recusou algum módulo

```bash
journalctl -k -b | grep -Ei 'nvidia|module verification|lockdown|key was rejected'
```

Essas mensagens podem ajudar a identificar erros de carregamento, assinatura ou incompatibilidade. Nem todo erro envolvendo NVIDIA é causado pelo Secure Boot.

# Resumo 

- **Secure Boot** = exige uma cadeia de confiança na inicialização e, no Ubuntu, assinaturas confiáveis para módulos do kernel.
- **Driver open** = código-fonte dos módulos de kernel NVIDIA publicado; não equivale a uma assinatura confiável.
- **MOK** = permite cadastrar uma chave para confiar em módulos assinados localmente.
- **RTX 4060** = compatível com a variante *open*, recomendada pela NVIDIA.
- **`ubuntu-drivers`** = caminho preferido para instalar drivers no Ubuntu, especialmente com Secure Boot habilitado.

## Referências

- [Fontes usadas para esta página](../../../referencias/linux)