import { Component, OnInit } from '@angular/core';
import {select,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  scaleOrdinal,
  schemeCategory10,
  drag,
  SimulationNodeDatum } from 'd3';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {

  constructor(private router: Router) {    
  }

  private nodes = [
    { index: 0, name: 'Matemáticas', group: 0 },
    { index: 1, name: 'Álgebra', group: 1 },
    { index: 2, name: 'Cálculo y analisis', group: 2 },
    { index: 3, name: 'fundamentos de las matematicas', group: 3 },
    { index: 4, name: 'Geometria', group: 4 },
    { index: 5, name: 'Matemáticas aplicadas', group: 5 },
    { index: 6, name: 'matemáticas discretas', group: 6 },
    { index: 7, name: 'Matemáticas recreativas', group: 7 },
    { index: 8, name: 'Probabilidad y estadistica', group: 8 },
    { index: 9, name: 'Teoría de números', group: 9 },
    { index: 10, name: 'Determinantes', group: 1 },
    { index: 11, name: 'Ecuaciones', group: 1 },
    { index: 12, name: 'Fracciones', group: 1 },
    { index: 13, name: 'Matrices', group: 1 },
    { index: 14, name: 'Polinomios', group: 1 },
    { index: 15, name: 'Programación lineal', group: 1 },
    { index: 16, name: 'Vectores', group: 1 },
    { index: 17, name: 'Sucesiones', group: 2 },
    { index: 18, name: 'Representación gráfica de funciones', group: 2 },
    { index: 19, name: 'Raíz cuadrada', group: 2 },
    { index: 20, name: 'Progresiones', group: 2 },
    { index: 21, name: 'Potencias y raíces', group: 2 },
    { index: 22, name: 'Números complejos', group: 2 },
    { index: 23, name: 'Medidas', group: 2 },
    { index: 24, name: 'Logaritmos', group: 2 },
    { index: 25, name: 'Límites', group: 2 },
    { index: 26, name: 'Integración', group: 2 },
    { index: 27, name: 'Inecuaciones', group: 2 },
    { index: 28, name: 'Representación gráfica de funciones', group: 2 },
    { index: 29, name: 'Ecuaciones logarítmicas', group: 2 },
    { index: 30, name: 'Ecuaciones exponenciales', group: 2 },
    { index: 31, name: 'Ecuaciones diferenciales', group: 2 },
    { index: 32, name: 'Derivación', group: 2 },
    { index: 33, name: 'Continuidad', group: 2 },
    { index: 34, name: 'Análisis vectorial', group: 2 }
  ];
  private links = [
    { source: this.nodes[0], target: this.nodes[1] },
    { source: this.nodes[0], target: this.nodes[2] },
    { source: this.nodes[0], target: this.nodes[3] },
    { source: this.nodes[0], target: this.nodes[4] },
    { source: this.nodes[0], target: this.nodes[5] },
    { source: this.nodes[0], target: this.nodes[6] },
    { source: this.nodes[0], target: this.nodes[7] },
    { source: this.nodes[0], target: this.nodes[8] },
    { source: this.nodes[0], target: this.nodes[9] },
    { source: this.nodes[1], target: this.nodes[10] },
    { source: this.nodes[1], target: this.nodes[11] },
    { source: this.nodes[1], target: this.nodes[12] },
    { source: this.nodes[1], target: this.nodes[13] },
    { source: this.nodes[1], target: this.nodes[14] },
    { source: this.nodes[1], target: this.nodes[15] },
    { source: this.nodes[1], target: this.nodes[16] },
    { source: this.nodes[2], target: this.nodes[17] },
    { source: this.nodes[2], target: this.nodes[17] },
    { source: this.nodes[2], target: this.nodes[18] },
    { source: this.nodes[2], target: this.nodes[19] },
    { source: this.nodes[2], target: this.nodes[20] },
    { source: this.nodes[2], target: this.nodes[21] },
    { source: this.nodes[2], target: this.nodes[22] },
    { source: this.nodes[2], target: this.nodes[23] },
    { source: this.nodes[2], target: this.nodes[24] },
    { source: this.nodes[2], target: this.nodes[25] },
    { source: this.nodes[2], target: this.nodes[26] },
    { source: this.nodes[2], target: this.nodes[27] },
    { source: this.nodes[2], target: this.nodes[28] },
    { source: this.nodes[2], target: this.nodes[29] },
    { source: this.nodes[2], target: this.nodes[30] },
    { source: this.nodes[2], target: this.nodes[31] },
    { source: this.nodes[2], target: this.nodes[32] },
    { source: this.nodes[2], target: this.nodes[33] },
    { source: this.nodes[2], target: this.nodes[34] }

  ];
  private color = scaleOrdinal(schemeCategory10);

  ngOnInit(): void {
    const div: any = document.getElementsByClassName('main-container-graph');
    const svg = select('div.graph').append('svg').attr('viewBox', '-200 -200 2000 2000');

    console.log(div.clientWidth);

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(this.links)
      .join('line');

    const node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(this.nodes)
    .enter()
    .append('g');

    const circles = node
      .append('circle')
      .attr('r', 10)
      .style('fill', (n) => this.color(n.group+ ''))
      .style('cursor', 'pointer')
      .on('dblclick', (e) => {
        console.log()
        const lesson_name: string = e.target.__data__.name.toLowerCase()
        this.router.navigate(['/lesson', lesson_name])
      })
      .call(
          drag()
          .on('start', (e, d) => dragstarted(e, d))
          .on('drag', (e, d) => dragged(e, d))
          .on('end', (e, d) => dragended(e, d))
      );

    const labels = node
      .append('text')
      .text((n) => n.name)
      .attr('x', 12)
      .attr('y', 3)
      .style('font-size', '12px')
      .style('color', (n) => this.color('' + n.group));

    node.append('title').text((n) => n.name);

    const simulation = forceSimulation(this.nodes)
      .force(
        'link',
        forceLink(this.links).id((d: any) => d.id)
        .distance(50)
      )
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(200, 200))
      .tick()
      .on('tick', () => {
        node.attr('transform', (n: any) => 'translate(' + n.x + ',' + n.y + ')');
        link
          .attr('x1', (l: any) => l.source.x)
          .attr('y1', (l: any) => l.source.y)
          .attr('x2', (l: any) => l.target.x)
          .attr('y2', (l: any) => l.target.y);
      });

      const dragstarted = (e: any, d: SimulationNodeDatum) => {
        if (!e.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      };
  
      const dragged = (e: any, d: SimulationNodeDatum) => {
        d.fx = e.x;
        d.fy = e.y;
      };
  
      const dragended = (e: any, d: SimulationNodeDatum) => {
        if (!e.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      };

  }
}
