---
html:
    toc: true
    offline: false
    print_background: true
toc:
    depth_from: 2
    depth_to: 6
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [1. Introduction](#1-introduction)
- [2. Principle](#2-principle)
- [3. Conclusion](#3-conclusion)

<!-- /code_chunk_output -->

## 1. Introduction
This article aims to shed light on resistors, which are fundamental electronic components, from an electromagnetic perspective.
## 2. Principle
The integral form of Maxwell's equations is as follows:

$$
\begin{align}
\oiint_s\bold{D}\cdot d\bold{s}&= Q_f \text{(1)}\\ 
\oiint_s\bold{B}\cdot d\bold{s}&= 0 \\
\oint_l \bold{E}\cdot d\bold{l}&= -\frac{d\Phi_B}{dt} \\
\oint_l \bold{H}\cdot d\bold{l}&= I_f + \frac{d\Phi_D}{dt}
\end{align}
$$

Additionally, the boundary conditions are as follows:

$$
\begin{align}
\hat{\bold{n}}\cdot(\bold{D}_1-\bold{D}_2)&=\rho_s \\
\hat{\bold{n}}\cdot(\bold{B}_1-\bold{B}_2)&=0 \\
\hat{\bold{n}}\times(\bold{E}_1-\bold{E}_2)&=0 \\
\hat{\bold{n}}\times(\bold{H}_1-\bold{H}_2)&=J_s
\end{align}
$$
Here, the unit vector $\hat{\bold{n}}$ indicates the direction perpendicular to the unit area.

Consider two terminals of a resistor are connected to the perfect conductors which suggests $\sigma\rightarrow\infty$. Thus, an electric field does not exist inside a perfect conduct because current density, $j=\sigma E$, diverges if electric field $E$ is not zero. Consequently, the typical bourndary conditions for perfect conductor and dielectrics structure are obtained:

$$
\begin{align}
\hat{\bold{n}}\cdot\bold{D}&=\rho_s \\
\hat{\bold{n}}\cdot\bold{B}&=0 \\
\hat{\bold{n}}\times\bold{E}&=0 \\
\hat{\bold{n}}\times\bold{H}&=J_s
\end{align}
$$

The structure of conductor-resistor-conductor is shown in Figure 1.
<div align=center>
<img src=./images/resistor_diagram.png>
<i>Figure 1. Diagram of conductor-resistor-conductor structure</i>
</div>

Let's clarify equation (9)~(12) in detail. The dot product extracts the perpendicular component, while the cross product extracts the parallel component. 
Equation (11) suggests that parallel component of electric field is zero, meaning that the electric field inside the resistor is perpendicular to the cross-section.
Equation (9) suggests that the electric field intensity numerically equal to $\rho_s/\varepsilon$, where $\rho_s$ is surface charge density.
Equation (10) suggests that the magnetic field is parallel to the cross section.
Equation (12) suggests that the magnetic field intensity is numerically equal to $J_s/\mu$.

The potential difference between the two interfaces of resistor is given by:

$$\begin{align}V=Ed\end{align}$$

The total current flows through the resistor can be obtain by integrating current density over surface area:

$$
\begin{align}
I=\iint_s{\bold{j}\cdot d\bold{s}}=\sigma EA
\end{align}
$$

We define the parameter resistance ($R$) to evaluate the current-voltage (*I-V*) relationship:

$$
\begin{align}
R=\frac{V}{I}=\frac{Ed}{\sigma EA}=\frac{d}{\sigma A}
\end{align}
$$

Moving on to energy dissipation in a resistor, according to [Poynting theorem](https://en.wikipedia.org/wiki/Poynting%27s_theorem), the rate of change of energy leaving the resistor can be described as:

$$
\begin{align}
u_d=\bold{j\cdot E}=\sigma E^2
\end{align}
$$

By substtituting $E$ with $V$ and $I$ using Eq.(13) and Eq.(14), we have:

$$
\begin{align}
u_d &= \frac{\sigma}{d^2}V^2 \\
&=\frac{1}{\sigma A^2}I^2
\end{align}
$$

The Joule power ($p$) is obtained by integrate $u_d$ over the volume of the resistor

$$
\begin{align}
p=\oiint_V u_d dv=u_dAd
\end{align}
$$

Introducing $R$ into Eq.(19), we get:
$$
\begin{align}
p&=\frac{V^2}{R} \\
&=I^2 R
\end{align}
$$

Therefore, we can also express $p$ as $p=UI$ since $V=IR$.

## 3. Conclusion
The resistance of a material is determined by its length, cross-sectional area, and conductivity. 