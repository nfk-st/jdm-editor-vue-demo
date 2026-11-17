<script setup lang="ts">
import { defineComponent, h, ref } from 'vue';
import {
  DecisionGraph,
  GraphSimulator,
  JdmConfigProvider,
} from '@nfk.st/jdm-editor-vue';
import type { DecisionGraphType, Simulation } from '@nfk.st/jdm-editor-vue';
import { shippingGraph } from './shipping-graph';

const graph = ref<DecisionGraphType>(shippingGraph);
const simulation = ref<Simulation | undefined>();

// Same runner the library's own Storybook stories use: GoRules' public
// simulate endpoint. Swap for your own backend when you have one.
const runSimulation = async ({
  graph: current,
  context,
}: {
  graph: DecisionGraphType;
  context: unknown;
}) => {
  try {
    const response = await fetch('https://editor.gorules.io/api/simulate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: current, context }),
    });
    const responseJson = await response.json();
    simulation.value = { result: { ...responseJson, snapshot: current } };
  } catch (error) {
    simulation.value = {
      error: {
        title: 'Simulation failed',
        message: String(error),
        data: {},
      },
    };
  }
};

// `renderPanel` is rendered as a component with no props, so the simulator
// wiring lives in a small wrapper component (see the library's dg.stories.ts).
const SimulatorPanel = defineComponent({
  name: 'SimulatorPanel',
  setup: () => () =>
    h(GraphSimulator, {
      defaultRequest: JSON.stringify(
        { customer: { country: 'US' }, cart: { weight: 50 } },
        null,
        2,
      ),
      onRun: runSimulation,
      onClear: () => {
        simulation.value = undefined;
      },
    }),
});

const panels = [
  {
    id: 'simulator',
    title: 'Simulator',
    icon: h('span', '▶'),
    hideHeader: true,
    renderPanel: SimulatorPanel,
  },
];
</script>

<template>
  <JdmConfigProvider>
    <DecisionGraph
      v-model="graph"
      default-active-panel="simulator"
      :panels="panels"
      :simulate="simulation"
      style="height: 100vh"
    />
  </JdmConfigProvider>
</template>
